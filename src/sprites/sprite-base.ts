export default class SpriteBase {
  collidable = false;
  xTilePos = 0;
  yTilePos = 0;
  xPos = 0;
  yPos = 0;
  width = 0;
  height = 0;

  draw(ctx: CanvasRenderingContext2D, x?: number, y?: number){
    throw new Error('A sprite must implement a draw function');
  }
}