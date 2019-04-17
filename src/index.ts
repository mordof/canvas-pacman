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

import scoreKeeper from './scoreKeeper';
import { default as map, MapType } from './map';

const width = 224;
const height = 288;

const tileSize = 8;

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

let gameState: GameState = GameState.Menu;

const draw = (delta: number) => {
  switch (gameState) {
    case GameState.Menu:
      // run menu

      break;
    case GameState.Playing:
      // draw the map (with pacs)
      ctx.drawImage(map.canvas, 0, 0, width, height);
      // draw all fruits (should only be ones collected. for now it's all)
      for (let i = 0; i < fruits.length; ++i) {
        fruits[i].draw(ctx, delta);
      }

      for (const sprite of sprites) {
        if (sprite.stationary === false) {
          sprite.calculateMovement(delta);
        }

        sprite.draw(ctx, delta);
      }

      break;
  }
}

function setupMenu() {
  pacman = new Pacman(Controller.init(new PacmanController));
}

function setupPlaying() {
  // loads the map up - also pre-renders walls and pacs.
  //                                                     // xOffset and yOffset in case we need them
  map.loadMap(MapType.Original, width, height, tileSize, 0, 0);

  pacman = new Pacman(Controller.init(new PacmanController));
  pacman.reset();
  scoreKeeper.registerPacman(pacman);

  // add pacman to list of sprites to be rendered/handled.
  sprites.push(pacman);
}

setupMenu();

let end = 0;

requestAnimationFrame((timestamp) => {
  if (!end) {
    end = timestamp;
    // skip first frame so we can get a delta to work with.
    return;
  }

  const delta = timestamp - end;

  draw(delta);

  end = timestamp;
});
