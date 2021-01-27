import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import styled from 'styled-components';

class NotFound extends Component {
  state = {
    snakeTail: [
      { x: 200, y: 200 },
      { x: 220, y: 200 },
      { x: 240, y: 200 },
    ],
    snakeSize: 3,
    gridTile: 20,
    snakeMove: 39,
    started: false,
    gameOver: false,
    appleTile: {
      x: Math.floor(Math.random() * 20) * 20,
      y: Math.floor(Math.random() * 20) * 20,
    },
    imageLoaded: false,
  };

  GameContainer = styled.div`
    background-color: #1c1d24;
  `;

  TextLabel = styled.div`
    color: white;
    font-size: 20px;
  `;

  arrowObj = {
    37: { x: -1, y: 0 },
    38: { x: 0, y: -1 },
    39: { x: 1, y: 0 },
    40: { x: 0, y: 1 },
  };

  pic404Obj = [
    { x: 20, y: 80, i: 20, j: 140 },
    { x: 20, y: 220, i: 100, j: 20 },
    { x: 60, y: 180, i: 20, j: 100 },
    { x: 160, y: 240, i: 80, j: 20 },
    { x: 160, y: 160, i: 80, j: 20 },
    { x: 160, y: 160, i: 20, j: 100 },
    { x: 220, y: 160, i: 20, j: 100 },
    { x: 280, y: 80, i: 20, j: 140 },
    { x: 280, y: 220, i: 100, j: 20 },
    { x: 320, y: 180, i: 20, j: 100 },
  ];

  render() {
    return (
      <this.GameContainer>
        <canvas id="game-box" ref="canvas" height="400" width="400" />
        {!this.state.started && this.state.gameOver && (
          <this.TextLabel>Game over, play again?</this.TextLabel>
        )}
        {!this.state.started && !this.state.gameOver && (
          <this.TextLabel>Use arrow keys to play!</this.TextLabel>
        )}
      </this.GameContainer>
    );
  }

  componentDidMount() {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext('2d');
    document.addEventListener('keydown', this.handleKeyPress);
    const refresh = 20;
    const gradient = ctx.createLinearGradient(-40, 0, 440, 0);
    gradient.addColorStop(0, 'rgba(34, 34, 34, 1)');
    gradient.addColorStop(0.25, 'rgba(28, 93, 153, 1)');
    gradient.addColorStop(0.75, 'rgba(99, 159, 171, 1)');
    gradient.addColorStop(1, 'rgba(187, 205, 229, 1)');
    this.interval = setInterval(() => {
      this.renderGame(ctx, canvas, gradient);
    }, 1000 / refresh);
  }

  handleKeyPress = (e) => {
    let snakeMove = e.keyCode;
    if (this.state.gameOver) snakeMove = 39;
    if ([37, 38, 39, 40].includes(snakeMove)) {
      if (
        (snakeMove === 37 && this.state.snakeMove !== 39) ||
        (snakeMove === 39 && this.state.snakeMove !== 37) ||
        (snakeMove === 38 && this.state.snakeMove !== 40) ||
        (snakeMove === 40 && this.state.snakeMove !== 38)
      )
        this.setState({ snakeMove, started: true, gameOver: false });
    }
  };

  snakeMove = () => {
    let { snakeMove, appleTile, snakeSize, gameOver, started } = this.state;
    let snakeTail = [...this.state.snakeTail];
    const currentSegment = this.state.snakeTail[this.state.snakeSize - 1];
    const newSegment = {
      x: currentSegment.x + this.arrowObj[snakeMove].x * this.state.gridTile,
      y: currentSegment.y + this.arrowObj[snakeMove].y * this.state.gridTile,
    };
    if (newSegment.x > 380) newSegment.x -= 400;
    if (newSegment.x < 0) newSegment.x += 400;
    if (newSegment.y > 380) newSegment.y -= 400;
    if (newSegment.y < 0) newSegment.y += 400;
    if (!(newSegment.x === this.state.appleTile.x && newSegment.y === this.state.appleTile.y)) {
      snakeTail.shift();
    } else {
      appleTile = {
        x: Math.floor(Math.random() * 20) * 20,
        y: Math.floor(Math.random() * 20) * 20,
      };
      snakeSize++;
    }
    snakeTail.forEach((segment) => {
      if (segment.x === newSegment.x && segment.y === newSegment.y) {
        gameOver = true;
        started = false;
        snakeSize = 3;
        snakeMove = 39;
      }
    });
    snakeTail = gameOver
      ? [
          { x: 200, y: 200 },
          { x: 220, y: 200 },
          { x: 240, y: 200 },
        ]
      : [...snakeTail, newSegment];
    this.setState({
      snakeTail,
      appleTile,
      snakeSize,
      gameOver,
      started,
      snakeMove,
    });
  };

  renderGame = (ctx, canvas, gradient) => {
    if (this.state.started) {
      ctx.fillStyle = '#1C1D24';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = gradient;
      this.state.snakeTail.forEach((segment) => {
        ctx.fillRect(segment.x, segment.y, this.state.gridTile, this.state.gridTile);
      });
      ctx.fillRect(
        this.state.appleTile.x,
        this.state.appleTile.y,
        this.state.gridTile,
        this.state.gridTile,
      );
      this.snakeMove();
    } else {
      ctx.fillStyle = '#1C1D24';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = gradient;
      this.pic404Obj.forEach((segment) => {
        ctx.fillRect(segment.x, segment.y, segment.i, segment.j);
      });
    }
  };

  imageLoaded = () => {
    console.log('loaded');
    this.setState({ imageLoaded: true });
  };
}

export default NotFound;
