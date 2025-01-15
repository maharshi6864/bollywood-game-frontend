import { CiMicrophoneOff, CiMicrophoneOn } from "react-icons/ci";
import { useState, useEffect, useRef } from "react";

const AudioComponent = ({ id }) => {
    const [micOn, setMicOn] = useState(false);
    const [localStream, setLocalStream] = useState(null);
    const [peerConnections, setPeerConnections] = useState({});
    const socketRef = useRef(null);
    const audioRefs = useRef({}); // To store audio elements for remote streams

    useEffect(() => {
        // Setup WebSocket connection
        socketRef.current = new WebSocket("ws://localhost:8080/aws");

        socketRef.current.onmessage = (message) => {
            const data = JSON.parse(message.data);
            handleSignalingData(data);
        };

        socketRef.current.onopen = () => {
            // Join the voice chat room
            socketRef.current.send(JSON.stringify({ type: "join", roomId: id }));
        };

        socketRef.current.onerror = (error) => {
            console.error("WebSocket error:", error);
        };

        return () => {
            // Cleanup WebSocket and peer connections on component unmount
            Object.values(peerConnections).forEach((pc) => pc.close());
            socketRef.current.close();
            cleanupAudioElements();
        };
    }, [id]);

    useEffect(() => {
        // Initialize local media stream
        const getMedia = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                setLocalStream(stream);
            } catch (error) {
                console.error("Error accessing microphone:", error);
            }
        };

        getMedia();
    }, []);

    const handleSignalingData = async (data) => {
        switch (data.type) {
            case "offer":
                await handleOffer(data.offer, data.senderId);

                break;
            case "answer":
                await handleAnswer(data.answer, data.senderId);
                break;
            case "ice-candidate":
                await handleICECandidate(data.candidate, data.senderId);
                break;
            default:
                console.warn("Unknown signaling data type:", data.type);
                break;
        }
    };

    const createPeerConnection = (peerId) => {
        const pc = new RTCPeerConnection();

        if (localStream) {
            // Add local tracks to the peer connection
            localStream.getTracks().forEach((track) => pc.addTrack(track, localStream));
        } else {
            console.error("Local stream not available for peer connection.");
        }

        // Handle remote stream
        pc.ontrack = (event) => {
            if (!audioRefs.current[peerId]) {
                const audio = document.createElement("audio");
                audio.autoplay = true;
                audioRefs.current[peerId] = audio;
                document.body.appendChild(audio);
            }
            audioRefs.current[peerId].srcObject = event.streams[0];
        };

        // Handle ICE candidates
        pc.onicecandidate = (event) => {
            if (event.candidate) {
                socketRef.current.send(
                    JSON.stringify({
                        type: "ice-candidate",
                        candidate: event.candidate,
                        roomId: id,
                        receiverId: peerId,
                    })
                );
            }
        };

        // Log errors for debugging
        pc.onconnectionstatechange = () => {
            if (pc.connectionState === "failed" || pc.connectionState === "disconnected") {
                console.warn(`Connection with peer ${peerId} failed/disconnected.`);
            }
        };

        return pc;
    };

    const handleOffer = async (offer, senderId) => {
        const pc = createPeerConnection(senderId);
        await pc.setRemoteDescription(new RTCSessionDescription(offer));
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);

        socketRef.current.send(
            JSON.stringify({ type: "answer", answer, roomId: id, receiverId: senderId })
        );

        setPeerConnections((prev) => ({ ...prev, [senderId]: pc }));
    };

    const handleAnswer = async (answer, senderId) => {
        const pc = peerConnections[senderId];
        if (pc) {
            await pc.setRemoteDescription(new RTCSessionDescription(answer));
        } else {
            console.error("PeerConnection not found for sender:", senderId);
        }
    };

    const handleICECandidate = async (candidate, senderId) => {
        const pc = peerConnections[senderId];
        if (pc) {
            await pc.addIceCandidate(new RTCIceCandidate(candidate));
        } else {
            console.error("PeerConnection not found for ICE candidate sender:", senderId);
        }
    };

    const toggleMicrophone = () => {
        if (localStream) {
            const audioTrack = localStream.getAudioTracks()[0];
            if (audioTrack) {
                audioTrack.enabled = !audioTrack.enabled;
                setMicOn(audioTrack.enabled);
            }
        } else {
            console.error("Local stream not available to toggle microphone.");
        }
    };

    const cleanupAudioElements = () => {
        Object.values(audioRefs.current).forEach((audioElement) => {
            if (audioElement) {
                audioElement.srcObject = null;
                audioElement.remove();
            }
        });
        audioRefs.current = {};
    };

    return (
        <div
            style={{
                position: "absolute",
                bottom: "45px",
                left: "5px",
                cursor: "pointer",
            }}
            onClick={toggleMicrophone}
        >
            <span style={{ fontSize: "30px" }}>
                {micOn ? <CiMicrophoneOn /> : <CiMicrophoneOff />}
            </span>
        </div>
    );
};

export default AudioComponent;
