import { h } from 'hyperapp'
import { Route } from '@hyperapp/router'
import Header from './Header'
import Menu from './Menu'
import Game from './Game'
import Lose from './LoseScreen'

/**
 * first object in the store is 'state' (an object - {})
 * second object in the store is 'actions' (an object - {})
 * here we destructure what is needed
 * 'num' from 'state' and 'add'/'sub' from 'actions'
 */

export default (
  { score, frogPosition, enemies, grid, gameOver, lives },
  { startGame, resetGame }
) => (
  <div key="main-screen" class="container">
    <Header score={score} lives={lives} />
    <div class="counter">
      <Route key="menu" path="/" render={Menu} />
      <Route
        key="game"
        path="/game"
        render={() =>
          gameOver ? (
            <Lose
              key="lose"
              path="/lose"
              startGame={startGame}
              score={score}
              resetGame={resetGame}
            />
          ) : (
            <Game
              frogPosition={frogPosition}
              startGame={startGame}
              enemies={enemies}
              grid={grid}
            />
          )
        }
      />
    </div>
  </div>
)
