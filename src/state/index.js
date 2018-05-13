const GRIDSIZE = 9;

export default {
  score: {
    currentScore: 0,
    highScore: 0,
  },
  hasCollided: false,
  gameOver: false,
  num: 0,
  countdown: 10,
  lives: 3,
  frogPosition: {
    x: 810,
    y: -5,
    width: 40,
    height: 60,
  },
  input: {
    up: false,
    down: false,
    left: false,
    right: false,
  },
  timestepAccumulator: 0,
  lastUpdate: null,
  grid: [...Array(9).keys()],
  accumulatedTimesteps: 0,
  enemies: [
    ...Array(8).fill({
      spriteType: 'angular',
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      width: 70,
      height: 70,
      originLeft: false,
      hasCollided: false,
    }),
    // ...
  ],
};
