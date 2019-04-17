import { default as Controller, Direction } from '../controller';
import { directionIsInverted } from '../lib/direction';
import SpriteBase from './sprite-base';
import map from '../map';
import frameData from '../frameData';

type AfterMoveHook = (onSpecificTile: boolean) => void;

export default class ControllableBase extends SpriteBase {
  readonly stationary = false;
  collidable = false;
  xTilePos = 0;
  yTilePos = 0;
  xPos = 0;
  yPos = 0;
  width = 0;
  height = 0;
  moveSpeed = 6;

  direction: Direction = 'right';
  queuedDirection?: Direction;

  onSpecificTile: boolean = false;
  
  readonly type: 'ghost' | 'pacman';

  private controller: Controller<any>;
  private afterMoveHook: AfterMoveHook;

  constructor (controller: Controller<any>) {
    super();
    this.controller = controller;
  }

  registerAfterMoveHook(hook: AfterMoveHook) {
    this.afterMoveHook = hook;
  }

  calculateMovement() {
    this.queuedDirection = this.controller.activeDirection;

    // when inverting direction, we don't need to worry about walls, etc.
    // simply turn around and carry on as though that were our original
    // instruction.
    if (
      this.queuedDirection
      && directionIsInverted(this.direction, this.queuedDirection)
    ) {
      this.direction = this.queuedDirection;
      this.queuedDirection = undefined;
    }

    this.move();

    if (this.afterMoveHook) {
      this.afterMoveHook(this.onSpecificTile);
    }
  }

  draw(ctx: CanvasRenderingContext2D){
    throw new Error('A sprite must implement a draw function');
  }

  private move() {
    const rawSpeed = (this.moveSpeed * map.tileSize) * (frameData.delta / 1000);

    let onNextTile = false;
    let destXPos: number;
    let destYPos: number;

    if (this.direction === 'left' && map.isTraversable(this.xTilePos - 1, this.yTilePos)) {
      this.xPos = this.xPos + -rawSpeed;
      destXPos = (this.xTilePos - 1) * map.tileSize;
      if (this.xPos <= destXPos) onNextTile = true;
    } else if (this.direction === 'right' && map.isTraversable(this.xTilePos + 1, this.yTilePos)) {
      this.xPos = this.xPos + rawSpeed;
      destXPos = (this.xTilePos + 1) * map.tileSize;
      if (this.xPos >= destXPos) onNextTile = true;
    } else if (this.direction === 'up' && map.isTraversable(this.xTilePos, this.yTilePos - 1)) {
      this.yPos = this.yPos + -rawSpeed;
      destYPos = (this.yTilePos - 1) * map.tileSize;
      if (this.yPos <= destYPos) onNextTile = true;
    } else if (this.direction === 'down' && map.isTraversable(this.xTilePos, this.yTilePos + 1)) {
      this.yPos = this.yPos + rawSpeed;
      destYPos = (this.yTilePos + 1) * map.tileSize;
      if (this.yPos >= destYPos) onNextTile = true;
    }

    this.onSpecificTile = onNextTile;

    if (onNextTile) {
      let remainingDelta;

      if (this.direction === 'left') remainingDelta = Math.abs(this.xPos - destXPos);
      if (this.direction === 'right') remainingDelta = Math.abs(this.xPos - destXPos);
      if (this.direction === 'up') remainingDelta = Math.abs(this.yPos - destYPos);
      if (this.direction === 'down') remainingDelta = Math.abs(this.yPos - destYPos);

      // update our tile position.
      if (this.direction === 'left') this.xTilePos = this.xTilePos + -1;
      if (this.direction === 'right') this.xTilePos = this.xTilePos + 1;
      if (this.direction === 'up') this.yTilePos = this.yTilePos + -1;
      if (this.direction === 'down') this.yTilePos = this.yTilePos + 1;

      // this.xPos = this.xTilePos * map.tileSize;
      // this.yPos = this.yTilePos * map.tileSize;

      if (map.isTeleportPad(this.xTilePos, this.yTilePos)) {
        const destination = map.getTeleportPad(this.xTilePos, this.yTilePos);
        this.xPos = map.tileSize * destination.x;
        this.yPos = map.tileSize * destination.y;
        this.xTilePos = destination.x;
        this.yTilePos = destination.y;
        this.direction = destination.direction;

        if (this.direction === 'left') this.xPos = this.xPos + -remainingDelta;
        if (this.direction === 'right') this.xPos = this.xPos + remainingDelta;
        if (this.direction === 'up') this.yPos = this.yPos + -remainingDelta;
        if (this.direction === 'down') this.yPos = this.yPos + remainingDelta;
      } else {
        // Examine queueDirection, and see if we can move towards that direction.
        // If not, ensure we can continue moving in the same direction we were going.
        // If we can't keep going any direction, truncate position to current tile position.
        if (this.direction === 'left' || this.direction === 'right') {
          if (this.queuedDirection === 'up' && map.isTraversable(this.xTilePos, this.yTilePos - 1, this.type)) {
            // up is asked for, and available.
            this.direction = 'up';
            // apply extra movement from previous delta headed towards x onto y position.
            this.yPos = this.yPos - remainingDelta;
          } else if (this.queuedDirection === 'down' && map.isTraversable(this.xTilePos, this.yTilePos + 1, this.type)) {
            this.direction = 'down';
            this.yPos = this.yPos + remainingDelta;
          } else if (!map.isTraversable(this.xTilePos, this.yTilePos, this.type)) {
            // truncate the positional direction to the last positional spot if we can't go any
            // further. this serves to stop us in the correct location at a wall.
            this.xPos = destXPos;
          }
        } else if (this.direction === 'up' || this.direction === 'down') {
          if (this.queuedDirection === 'left' && map.isTraversable(this.xTilePos - 1, this.yTilePos, this.type)) {
            this.direction = 'left';
            this.xPos = this.xPos - remainingDelta;
          } else if (this.queuedDirection === 'right' && map.isTraversable(this.xTilePos + 1, this.yTilePos, this.type)) {
            this.direction = 'right';
            this.xPos = this.xPos + remainingDelta;
          } else if (!map.isTraversable(this.xTilePos, this.yTilePos, this.type)) {
            // truncate the positional direction to the last positional spot if we can't go any
            // further. this serves to stop us in the correct location at a wall.
            this.yPos = destYPos;
          }
        }
      }

      // We've handled queueDirection in all cases now (currently ignoring it for teleports).
      // This gets evaluated, and cleared, each time we reach a destination tile.
      this.queuedDirection = undefined;
    }
  }
}
