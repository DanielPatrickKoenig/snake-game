import './index.css'
import {TweenLite} from 'gsap';
import axios from 'axios';
import SnakeGame from './engine/SnakeGame';
var nums = {a: 1, b: 2};
TweenLite.to(nums, .5, {a: 50, onUpdate: function (o,p) {
  console.log(o[p]);
}, onUpdateParams: [nums,'a']});
axios.get('bundle.js').then((response) => {
  console.log(response);
});
window.onload = () => {
  const gameBoard = document.querySelector('.game-board');
  const snakeHead = document.createElement('div');
  snakeHead.setAttribute('class', 'snake-part');
  gameBoard.appendChild(snakeHead);
  let snakeParts = [snakeHead];
  const game = new SnakeGame({x: 50, y: 50, width: 100, height: 100});
  game.onMove = (parts) => {
    parts.forEach((item, index) => {snakeParts[index].setAttribute('style', `left: ${item.x}%; top: ${item.y}%;`)});
  };
  game.onPartAdded = () => {
    const snakeHead = document.createElement('div');
    snakeHead.setAttribute('class', 'snake-part');
    gameBoard.appendChild(snakeHead);
    snakeParts.push(snakeHead);
  }
  game.onFoodPlaced = () => {
    console.log('food placed');
    const foodElement = document.querySelector('.game-food');
    foodElement.setAttribute('style', `left: ${game.food.x}%; top: ${game.food.y}%;`);
  }
  game.onGameOver = () => {
    console.log('game over');
  }
  game.playGame();

  document.querySelector('.up').addEventListener('click', () => { game.changeDirection(0, -1); });
  document.querySelector('.down').addEventListener('click', () => { game.changeDirection(0, 1); });
  document.querySelector('.left').addEventListener('click', () => { game.changeDirection(-1, 0); });
  document.querySelector('.right').addEventListener('click', () => { game.changeDirection(1, 0); });
  document.querySelector('.pausePlay').addEventListener('click', () => { game.isPlaying = !game.isPlaying });
  document.querySelector('.startPlay').addEventListener('click', () => { 
    if(game.gameOver) {
      snakeParts = [];
      const parts = document.querySelectorAll('.snake-part');
      for(let i = parts.length - 1; i >= 0; i--){
        parts[i].parentNode.removeChild(parts[i]);
      }
      const snakeHead = document.createElement('div');
      snakeHead.setAttribute('class', 'snake-part');
      gameBoard.appendChild(snakeHead);
      snakeParts = [snakeHead];
      game.playGame();
      
    }
  });

}


