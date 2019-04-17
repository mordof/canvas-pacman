import {
  default as InputHandler,
  Direction,
  EveryInput,
} from './input-handlers/input-handler-base';

import ControllableBase from './sprites/controllable-base';

export { Direction };

export default class Controller <SpriteType extends ControllableBase>{
  directions: { [key in Direction]: boolean } = {
    left: false,
    right: false,
    up: false,
    down: false,
  };

  activeDirection?: Direction;
  controllable: SpriteType;

  private handler?: InputHandler<SpriteType>;

  static init<SpriteType extends ControllableBase>(inputHandler: InputHandler<SpriteType>) {
    return new Controller(inputHandler);
  }

  constructor (inputHandler: InputHandler<SpriteType>) {
    this.handler = inputHandler;
  }

  registerHandler(inputHandler: InputHandler<SpriteType>) {
    if (this.handler) {
      this.handler.disconnect();
    }

    this.handler = inputHandler;
    this.handler.connect(this.controllable, this.catchInput);
  }

  registerControllable(controllable: SpriteType) {
    this.controllable = controllable;
    this.handler.connect(this.controllable, this.catchInput);
  }

  private catchInput = (input?: EveryInput) => {
    this.resetDirections();

    switch(input) {
      case 'left':
      case 'right':
      case 'up':
      case 'down':
        this.directions[input] = true;
        this.activeDirection = input;
        break;
    }
  }

  private resetDirections() {
    this.activeDirection = undefined;

    this.directions.left = false;
    this.directions.right = false;
    this.directions.up = false;
    this.directions.down = false;
  }
}