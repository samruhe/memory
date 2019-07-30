import React from 'react'
import ModalDiff from './components/modals/DifficultyModal'
import Header from './header/Header'
import Game from './components/Game'

class App extends React.Component {
    state = {
        numCards: 0,
        level: -1,
        numColumns: 4
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
                level: 0,
                numColumns: 4
            })
        } else if (id === "med") {
            this.setState({
                numCards: 24,
                level: 1,
                numColumns: 6
            })
        } else if (id === "hard") {
            this.setState({
                numCards: 32,
                level: 2,
                numColumns: 8
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
                    <Game numCards={this.state.numCards} changeDiff={this.changeDiff} numCols={this.state.numColumns} />
                }
            </div>
        )
    }
}

export default App