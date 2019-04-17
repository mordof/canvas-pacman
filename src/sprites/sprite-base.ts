export default class SpriteBase {
  collidable = false;
  xTilePos = 0;
  yTilePos = 0;
  xPos = 0;
  yPos = 0;

  draw(ctx: CanvasRenderingContext2D, delta: number, x?: number, y?: number){
    throw new Error('A sprite must implement a draw function');
  }
}
