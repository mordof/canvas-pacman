import FruitBase from './fruit-base';
import map from '../../map';

export default class WatermelonSprite extends FruitBase {
  xTilePos = 14;
  yTilePos = 18;
  xPos = 0;
  yPos = 0;
  collisionRadius = 0.4;
  value = 5000;

  draw(ctx: CanvasRenderingContext2D, x?: number, y?: number) {
    const { tileSize, tileMod, xOffset, yOffset } = map;
    ctx.save();
    if(x > 0 && y > 0)
      ctx.translate(x, y);
    else
      ctx.translate(xOffset + this.xPos, yOffset + this.yPos);

    ctx.fillStyle = "#198122"
    ctx.beginPath();
    ctx.moveTo(tileSize / 2, tileSize / 6)
    ctx.arc(tileSize / 2, tileSize / 6, tileSize / 1.15, 1.1, 2, false)
    ctx.fill()
    ctx.closePath();

    ctx.beginPath();
    ctx.fillStyle = "#ACFB77"
    ctx.moveTo(tileSize / 2, tileSize / 6)
    ctx.arc(tileSize / 2, tileSize / 6, tileSize / 1.3, 1.1, 2, false)
    ctx.fill()
    ctx.closePath();

    ctx.beginPath();
    ctx.fillStyle = "#F92F2F"
    ctx.moveTo(tileSize / 2, tileSize / 6)
    ctx.arc(tileSize / 2, tileSize / 6, tileSize / 1.7, 1.1, 2, false)
    ctx.fill()
    ctx.closePath();

    ctx.beginPath();
    ctx.fillStyle = "black"
    ctx.moveTo(12 * tileMod, 9 * tileMod)
    ctx.arc(12 * tileMod, 9 * tileMod, tileSize / 12, 1.1, 2, false)
    ctx.moveTo(13 * tileMod, 12 * tileMod)
    ctx.arc(13 * tileMod, 12 * tileMod, tileSize / 12, 1.1, 2, false)
    ctx.moveTo(10.5 * tileMod, 12 * tileMod)
    ctx.arc(10.5 * tileMod, 12 * tileMod, tileSize / 12, 1.1, 2, false)
    ctx.fill()
    ctx.closePath();
    
    ctx.restore();
  }
}
