import React from 'react'
import '../../styles/Modal.css'

function GameOverModal({show, moves, time, close}) {
    const seconds = time / 1000
    return (
        <div>
            <div 
                id="myModal" 
                className="modal"
                style = {{
                    display: show ? 'block' : 'none'
                }}
            >
                <div className="modal-content">
                    <span className="close" onClick={close}>&times;</span>
                    <h2>Congratulations</h2>
                    <div>
                        <p>You won in {moves} moves and finished in {seconds.toFixed(2)} seconds!</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GameOverModal