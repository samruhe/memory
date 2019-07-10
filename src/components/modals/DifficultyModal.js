import React from 'react'
import '../../styles/Modal.css'

function DifficultyModal({show, pickLevel}) {
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
                    <div>
                        <h2>Pick a Difficulty</h2>
                        <button id="easy" onClick={pickLevel}>Easy</button>
                        <button id="med" onClick={pickLevel}>Medium</button>
                        <button id="hard" onClick={pickLevel}>Hard</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DifficultyModal