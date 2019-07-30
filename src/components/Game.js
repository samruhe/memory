import React from 'react'
import Card from './Card'
import Commands from './Commands'
import GameOver from './modals/GameOverModal'

class Game extends React.Component {
    state = {
        isFlipped: Array(this.props.numCards).fill(false),
        shuffledCard: Game.duplicateCard(this.props.numCards).sort(() => Math.random() - 0.5),
        clickCount: 1,
        moveCount: 0,
        prevSelectedCard: -1,
        prevCardId: -1,
        isDisabled: false,       // clicking disabled when two cards selected
        hasWon: false,           // displaying winning modal
        completed: false,        // displaying button text when game finished
        level: -1,               // -1 none, 0 easy, 1 med, 2 hard
        timeStart: 0,            // time when first card clicked
        timeEnd: 0,              // time when user won
        timerStarted: false      // boolean to see if game has started
    }

    static duplicateCard = (numCards) => {
        if (numCards === 12) {
            return ['#0027F5', '#D53377', '#82F94E', '#F19135', '#EA3EE5', '#832EDF'].reduce((preValue, current, index, array) => {
                return preValue.concat([current, current])
            }, [])
        } else if (numCards === 24) {
            return ['#0027F5', '#D53377', '#82F94E', '#F19135', '#EA3EE5', '#832EDF', '#EB4526', '#75FAB1', '#5FD5FA', '#E8E14C', '#D1AAF9', '#F8FDB6'].reduce((preValue, current, index, array) => {
                return preValue.concat([current, current])
            }, [])
        } else if (numCards === 32) {
            //        blue      fuchsia     green      orange    pink       purple      red        seagreen  skyblue    yellow     baby pink  baby yel   baby purp   coral    lime yel    rust
            return ['#0027F5', '#D53377', '#82F94E', '#F19135', '#EA3EE5', '#832EDF', '#EB4526', '#75FAB1', '#5FD5FA', '#E8E14C', '#D1AAF9', '#F8FDB6', '#9A99F8', '#EF7E72', '#C8FF17', '#E8770C'].reduce((preValue, current, index, array) => {
                return preValue.concat([current, current])
            }, [])
        }
    }

    handleClick = (event) => {
        event.preventDefault()
        var start = ""
        if (!this.state.timerStarted) {   // get current time when first Card clicked
            start = new Date().getTime()
            this.setState({
                timeStart: start,
                timerStarted: true
            })
        }

        const cardId = event.target.id
        const newFlips = this.state.isFlipped.slice()
        this.setState({
            prevSelectedCard: this.state.shuffledCard[cardId],
            prevCardId: cardId,
        })

        if (newFlips[cardId] === false) {
            newFlips[cardId] = !newFlips[cardId]
            this.setState(prevState => ({
                isFlipped: newFlips,
                clickCount: this.state.clickCount + 1
            }))

            if (this.state.clickCount === 2) {
                this.setState({
                    clickCount: 1,
                    isDisabled: true,
                    moveCount: this.state.moveCount + 1
                })
                const prevCardId = this.state.prevCardId
                const newCard = this.state.shuffledCard[cardId]
                const previousCard = this.state.prevSelectedCard
                
                this.isCardMatch(previousCard, newCard, prevCardId, cardId)
            }
        }
    }

    isCardMatch = (prevCard, newCard, prevCardId, newCardId) => {
        if (prevCard === newCard) {
            const hideCard = this.state.shuffledCard.slice()
            hideCard[prevCardId] = -1
            hideCard[newCardId] = -1
            setTimeout(() => {
                this.setState(prevState => ({
                    isDisabled: false,
                }))
            }, 0)
            if (this.didWin()) {
                var end = new Date().getTime()
                this.setState({
                    hasWon: true,
                    completed: true,
                    timeEnd: end
                })
            }
        } else {
            const flipBack = this.state.isFlipped.slice()
            flipBack[prevCardId] = false
            flipBack[newCardId] = false
            setTimeout(() => {
                this.setState(prevState => ({
                    isFlipped: flipBack,
                    isDisabled: false
                }))
            }, 600)
        }
    }

    restartGame = () => {
        this.setState({
            isFlipped: Array(this.props.numCards).fill(false),
            shuffledCard: Game.duplicateCard(this.props.numCards).sort(() => Math.random() - 0.5),
            clickCount: 1,
            moveCount: 0,
            prevSelectedCard: -1,
            prevCardId: -1,
            isDisabled: false,
            hasWon: false,
            completed: false,
            timeStart: 0,
            timeEnd: 0,
            timerStarted: false
        })
    }

    didWin = () => {
        var found = 0;
        for(var i = 0; i < this.state.isFlipped.length; i++) {
            if (this.state.isFlipped[i] !== false) {
                found += 1;
            }
        }
        if (found >= this.props.numCards - 1) {
            return true
        } else { return false }
    }

    closeModalHandler = () => {
        this.setState({
            hasWon: false
        })
    }

    render() {
        var styles = {}
        if (this.state.isDisabled) {
            styles = { pointerEvents: "none" }
        } else {
            styles = {}
        }

        var classN = ""
        if (this.props.numCols === 4) {
            classN = "grid-container easy"
        } else if (this.props.numCols === 6) {
            classN = "grid-container medium"
        } else if (this.props.numCols === 8) {
            classN = "grid-container hard"
        }

        return (
            <div className="page-container">
                <div>
                    <div className={classN} style={styles}>
                        {
                            this.state.shuffledCard.map((cardNumber, index) =>
                            <Card
                                key={index}
                                id={index}
                                cardNumber={cardNumber}
                                isFlipped={this.state.isFlipped[index]}
                                handleClick={this.handleClick}
                            />
                            )
                        }
                    </div>
                    <Commands hasCompleted={this.state.completed} changeDiff={this.props.changeDiff} restart={this.restartGame}/>

                    <GameOver 
                        show={this.state.hasWon} 
                        moves={this.state.moveCount}
                        time={this.state.timeEnd - this.state.timeStart}
                        close={this.closeModalHandler} 
                    />
                </div>
            </div>
        )
    }
}

export default Game