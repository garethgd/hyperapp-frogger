import { location } from '@hyperapp/router'

const gridSize = 713
const gameSize = 320
const gridRow = 9
const TIME_STEP = 600
const windowWidth = window.innerWidth - 100

const hasCollided = (enemy, frogPosition) =>
  enemy.x < frogPosition.x + frogPosition.width &&
  enemy.x + enemy.width > frogPosition.x &&
  enemy.y < frogPosition.y + frogPosition.height &&
  enemy.height + enemy.y > frogPosition.y

export default {
  startGame: () => (state, actions) => {
    actions.setPosition()
    actions.update(0)
    return { lives: 3, gameOver: false }
  },
  resetGame: () => (state, actions) => {
    actions.startGame()
    return { gameOver: false }
  },
  loseLife: () => (state, actions) => {
    const updatedLives = state.lives - 1
    if (updatedLives < 1) {
      actions.resetGame()
      return {
        lives: 0,
        gameOver: true,
        frogPosition: { ...state.frogPosition, x: 810, y: -5 },
      }
    } else {
      return {
        lives: updatedLives,
        gameOver: false,
        frogPosition: { ...state.frogPosition, x: 810, y: -5 },
      }
    }
  },

  setPosition: () => (state, actions) => {
    const updatedEnemies = state.enemies.map(enemy => {
      let initialY = (enemy.y += 713 / gridRow)
      const randomSprite = Math.random() >= 0.5
      let isLeftOrigin = Math.random() >= 0.5
      enemy.originLeft = isLeftOrigin
      let initialX = isLeftOrigin ? 0 : windowWidth
      const spriteType = randomSprite ? 'angular' : 'react'

      return {
        ...enemy,
        ...{
          x: state.hasCollided ? 10 : initialX,
          y: state.hasCollided ? -20 : initialY,
          originLeft: isLeftOrigin,
          spriteType: spriteType,
        },
      }
    })

    return { enemies: [...updatedEnemies] }
  },
  handleKeyDown: e => (state, actions) => {
    switch (e.key) {
      case 'ArrowUp':
        return {
          score: {
            ...state.score,
            currentScore: state.score.currentScore + 10,
          },
          frogPosition: {
            ...state.frogPosition,
            y: state.frogPosition.y + gridSize / gridRow,
          },
        }
        break
      case 'ArrowDown':
        return {
          frogPosition: {
            ...state.frogPosition,
            y: Math.max(state.frogPosition.y - gridSize / gridRow),
            x: state.frogPosition.x,
          },
        }
        break
      case 'ArrowLeft':
        return {
          frogPosition: {
            ...state.frogPosition,
            x: state.frogPosition.x - gridSize / gridRow,
            y: state.frogPosition.y,
          },
        }
        break
      case 'ArrowRight':
        return {
          frogPosition: {
            ...state.frogPosition,
            x: state.frogPosition.x + gridSize / gridRow,
            y: state.frogPosition.y,
          },
        }
        break
      default:
    }
  },

  setGrid: grid => ({ grid }),
  windowLoseFocus: () => state => ({
    input: {
      up: false,
      down: false,
      left: false,
      right: false,
    },
  }),
  update: time => (state, actions) => {
    const delta = state.lastUpdate ? time - state.lastUpdate : 0
    let accumulator = state.timestepAccumulator + delta
    let nextState = { ...state }
    nextState = actions.moveEnemies(nextState)
    let collision = false
    nextState.lastUpdate = time

    let hasCollided = nextState.enemies.some(enemy => enemy.hasCollided)

    if (hasCollided) actions.loseLife()

    while (accumulator > TIME_STEP) {
      nextState = actions.moveEnemies(nextState)
      if (nextState.hasCollided) break
      accumulator -= TIME_STEP
    }
    requestAnimationFrame(actions.update)
    return nextState
  },

  moveEnemies: windowWith => (state, actions) => {
    return {
      timestepAccumulator: state.timestepAccumulator - 1,
      enemies: state.enemies.map(enemy => {
        const change = Math.floor(Math.random() * 1.2) * 10

        return {
          ...enemy,
          ...{
            x: enemy.originLeft
              ? enemy.x > windowWidth ? 0 : enemy.x + change
              : enemy.x < 10 ? windowWidth : enemy.x - change,
            hasCollided: hasCollided(enemy, state.frogPosition),
          },
        }
      }),
    }
  },

  location: location.actions,
}
