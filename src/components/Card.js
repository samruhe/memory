import React from 'react'

function Card({id, isFlipped, handleClick, cardNumber}) {
    var classN = ""
    var styles = {}
    
    if(isFlipped) {
        classN = "card card-back"
        styles = {background: cardNumber}
    } else {
        classN = "card card-front"
    }

    return (
        <button 
            id={id} 
            className={`${classN} ${cardNumber !== -1 ? "" : "hide-card"}`}
            onClick={handleClick}
            style={styles}
        ></button>
    )
}

export default Card