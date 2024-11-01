import SockJS from "sockjs-client";


export const GLOBAL_URL = "http://localhost:8080/";
export const SOCKET = new SockJS('http://localhost:8080/ws');
