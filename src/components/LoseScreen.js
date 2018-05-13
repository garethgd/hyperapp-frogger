import { h } from 'hyperapp'
import { Link } from '@hyperapp/router'

export default props => (
  <div key="lose" className="lose">
    <div className="currentScore">
      <h1>Game Over</h1> Score <span>{props.score.currentScore} </span>
      <h2> Continue? </h2>
      <span> </span>
    </div>

    <div className="high-score">
      <Link to={'/game'}>
        <button onclick={() => props.startGame()} class="ghost-btn lose">
          Yes
        </button>
      </Link>
      <Link to={'/'}>
        <button onclick={() => props.resetGame()} class="ghost-btn lose">
          No
        </button>
      </Link>
    </div>
  </div>
)
