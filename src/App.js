import React from 'react'
import ModalDiff from './components/modals/DifficultyModal'
import Header from './header/Header'
import Game from './components/Game'

class App extends React.Component {
    state = {
        numCards: 0,
        level: -1
    }

    changeDiff = () => {
        this.setState({
            level: -1
        })
    }

    pickLevel = (event) => {
        const {id} = event.target
        if (id === "easy") {
            this.setState({
                numCards: 12,
                level: 0
            })
        } else if (id === "med") {
            this.setState({
                numCards: 20,
                level: 1
            })
        } else if (id === "hard") {
            this.setState({
                numCards: 28,
                level: 2
            })
        }
    }

    renderLevelChoice() {
        return (
            <ModalDiff
                show={true}
                close={this.closeModalHandler}
                pickLevel={this.pickLevel}
            />
        )
    }

    render() {
        return (
            <div>
                <Header />
                {this.state.level === -1 ? this.renderLevelChoice() : 
                    <Game numCards={this.state.numCards} changeDiff={this.changeDiff} />
                }
            </div>
        )
    }
}

export default App