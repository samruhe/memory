import React from 'react'

function Card({id, isFlipped, handleClick, cardNumber}) {
    var classN = ""
    var keyN = ""
    var styles = {}
    
    if(isFlipped) {
        classN = "card card-back"
        keyN = "back"
        styles = {background: cardNumber}
    } else {
        classN = "card card-front"
        keyN = "front"
    }

    return (
        <button 
            id={id} 
            className={`${classN} ${cardNumber !== -1 ? "" : "hide-card"}`}
            onClick={handleClick}
            key={keyN}
            style={styles}
        ></button>
    )
}

export default Card