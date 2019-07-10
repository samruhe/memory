import React from 'react'

function Commands({hasCompleted, restart, changeDiff}) {
    return (
        <div className="commands">
            <button id="changeDiff" onClick={changeDiff}>Change Difficulty</button>
            <button id="restart" onClick={restart}>{hasCompleted ? "Play Again" : "Restart"}</button>
        </div>
    )
}

export default Commands