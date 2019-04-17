import Controller from './controller';
import PacmanController from './input-handlers/keyboard/pacman-keyboard';

import Pacman from './sprites/pacman';
import Ghost from './sprites/ghost';

import Apple from './sprites/fruits/apple';
import Cherry from './sprites/fruits/cherry';
import Peach from './sprites/fruits/peach';
import Strawberry from './sprites/fruits/strawberry';
import Watermelon from './sprites/fruits/watermelon';

import SpriteBase from './sprites/sprite-base';
import FruitBase from './sprites/fruits/fruit-base';

import frameData from './frameData';
import collisionHandler from './collision-handler';

import scoreKeeper from './scoreKeeper';
import { default as map, MapType } from './map';

const width = 256 * 3;
const height = 256 * 3;

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = width;
canvas.height = height;

let pacman: Pacman;
let fruits: [Apple, Cherry, Peach, Strawberry, Watermelon] = [
  new Apple(),
  new Cherry(),
  new Peach(),
  new Strawberry(),
  new Watermelon(),
];
let sprites: (Ghost | Pacman | Apple | Cherry | Peach | Strawberry | Watermelon)[] = [];

enum GameState {
  Menu,
  Playing
};

let gameState: GameState = GameState.Playing;

function setupMenu() {
  pacman = new Pacman(Controller.init(new PacmanController));
}

function setupPlaying() {
  // loads the map up - also pre-renders walls and pacs.
  map.loadMap(MapType.Original, width, height);

  // @ts-ignore
  global.map = map;

  pacman = new Pacman(Controller.init(new PacmanController));
  scoreKeeper.registerPacman(pacman);

  // add pacman to list of sprites to be rendered/handled.
  sprites.push(pacman);
}

setupPlaying();

const frame = () => {
  switch (gameState) {
    case GameState.Menu:
      // run menu

      break;
    case GameState.Playing:
      // draw the map (with pacs)
      ctx.drawImage(map.canvas, 0, 0);
      // draw all fruits (should only be ones collected. for now it's all)
      for (let i = 0; i < fruits.length; ++i) {
        fruits[i].draw(ctx);
      }

      for (const sprite of sprites) {
        if (sprite.stationary === false) {
          sprite.calculateMovement();
        }

        sprite.draw(ctx);
      }

      ctx.save()
      ctx.fillStyle = "#ff0000"
      ctx.fillRect(pacman.xTilePos * map.tileSize, pacman.yTilePos * map.tileSize, 5, 5);
      ctx.restore()

      collisionHandler.run(pacman, sprites);

      break;
  }
}

const frameController = (timestamp: number) => {
  frameData.update(timestamp);
  frame();
  requestAnimationFrame(frameController);
}

requestAnimationFrame(frameController);
