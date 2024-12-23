const ExitOrLeaveGameModel = ({hostPlayerCheck}) => {
    return (
        <div className="d-flex justify-content-around mt-3">
            { hostPlayerCheck && (
                <button className="btn btn-danger" onClick={endGame}>
                    End Game
                </button>
            )}
            <button className="btn btn-danger" onClick={quitGame}>
                Quit Game
            </button>
        </div>
    )
}
