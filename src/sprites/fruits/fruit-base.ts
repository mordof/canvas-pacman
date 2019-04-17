import SpriteBase from '../sprite-base';

export default class FruitBase extends SpriteBase {
  readonly stationary = true;
  collidable = true;
  readonly type = 'fruit';
  
  collisionRadius = 0;
  value = 0;
}