import { h } from 'hyperapp'
import { Link } from '@hyperapp/router'

export default ({ score, lives }) => (
  <div key="header" className="score">
    <div className="currentScore">
      <h1>Score</h1> <span>{score.currentScore} </span>
    </div>

    <div className="high-score">
      <h1>High Score</h1> <span>{score.highScore} </span>
    </div>

    <div className="lives">
      <h1>Lives</h1> <span>{lives} </span>
    </div>
  </div>
)
