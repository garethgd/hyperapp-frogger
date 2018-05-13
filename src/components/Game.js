import { h } from 'hyperapp';

const HyperAppSprite = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      id="hyperapp"
      width="100%"
      height="100%"
      viewBox="0 0 691 585"
      version="1.1"
    >
      <g transform="matrix(1,0,0,1,-154.583,-207.856)">
        <g transform="matrix(2.45578,0,0,2.45578,154.583,207.856)">
          <path
            d="M245.853,47.585L93.936,47.585L111.257,0L60.618,0L0,166.547L50.637,166.547L76.618,95.17L228.531,95.17L219.871,118.962L93.41,118.962L67.363,190.339L67.363,190.34C65.948,194.226 65.224,198.331 65.224,202.467C65.224,221.918 81.23,237.924 100.681,237.924L176.57,237.924L193.89,190.339L118.001,190.339L126.728,166.547L202.551,166.547L193.891,190.339L244.53,190.339L279.171,95.17L279.171,95.169C280.586,91.283 281.31,87.178 281.31,83.042C281.31,63.591 265.304,47.585 245.853,47.585Z"
          />
        </g>
      </g>
    </svg>
  );
};

const AngularSprite = i => (
  <i key={i} style={{ color: '#C3002F' }} class="fab fa-angular" />
);

const ReactSprite = i => (
  <i key={i} style={{ color: '#59d9fb' }} class="fab fa-react" />
);

const Enemy = enemy => {
  const position = { ...enemy.position };
  const sprite =
    position.spriteType === 'angular' ? (
      <AngularSprite key={position.y} />
    ) : (
      <ReactSprite key={position.y} />
    );
  return (
    <div
      key={position.y}
      id="enemy"
      class="enemy"
      style={{
        marginLeft: `${position.x}px`,
        bottom: `${position.y}px`,
      }}
    >
      {sprite}
    </div>
  );
};

export default props => {
  return (
    <div
      key="game-screen"
      oncreate={() => {
        props.startGame();
      }}
    >
      <div class="wrapper-game" id="stage">
        {props.enemies.map((enemy, index) => {
          return (
            <div>
              <Enemy key={index} position={enemy} index={index} />
            </div>
          );
        })}
        {props.grid.map(() => {
          return <div class="street" />;
        })}
        <div
          style={{
            bottom: `${props.frogPosition.y}px`,
            left: `${props.frogPosition.x}px`,
          }}
          class="frogger"
          id="frog"
        >
          <HyperAppSprite />
        </div>
      </div>
    </div>
  );
};
