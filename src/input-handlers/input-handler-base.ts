import ControllableBase from '../sprites/controllable-base';

export type Direction = 'left' | 'right' | 'up' | 'down';
export type EveryInput = Direction | 'start' | 'select';

export type InputCallback = (input: EveryInput) => void

export default class InputHandler <SpriteType extends ControllableBase>{
  sendInput: InputCallback;
  controllable: SpriteType;
  connected: boolean;

  constructor() {
    this.connected = false;
  }

  connect(controllable: SpriteType, callback: InputCallback) {
    this.sendInput = callback;
    this.controllable = controllable;
    this.connected = true;
  }

  disconnect() {
    this.sendInput = undefined;
    this.connected = false;
  }
};