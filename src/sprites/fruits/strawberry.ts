import FruitBase from './fruit-base';
import map from '../../map';

export default class StrawberrySprite extends FruitBase {
  xTilePos = 14;
  yTilePos = 18;
  xPos = 0;
  yPos = 0;
  collisionRadius = 0.4;
  value = 500;

  draw(ctx: CanvasRenderingContext2D, x?: number, y?: number) {
    const { tileSize, tileMod, xOffset, yOffset } = map;
    ctx.save();
    if(x > 0 && y > 0)
      ctx.translate(x, y);
    else
      ctx.translate(xOffset + this.xPos, yOffset + this.yPos);

    ctx.beginPath();
    ctx.fillStyle = "red";

    // berry base
    ctx.moveTo(tileSize / 2, tileSize - tileSize / 18)
    ctx.bezierCurveTo(0, tileSize / 1.3, 0, -tileSize / 9, tileSize / 2, tileSize / 6)
    ctx.moveTo(tileSize / 2, tileSize - tileSize / 18)
    ctx.bezierCurveTo(tileSize, tileSize / 1.3, tileSize, -tileSize / 9, tileSize / 2, tileSize / 6)
    
    ctx.fill();
    ctx.closePath();

    ctx.fillStyle = "white";

    // seeds
    ctx.fillRect(tileSize / 4, tileSize / 3, tileSize / 18, tileSize / 16)
    ctx.fillRect(tileSize / 2, tileSize / 4, tileSize / 18, tileSize / 16)
    ctx.fillRect(tileSize - tileSize / 3.5, tileSize / 2.4, tileSize / 18, tileSize / 16)
    ctx.fillRect(tileSize - tileSize / 2.2, tileSize / 2, tileSize / 18, tileSize / 16)
    ctx.fillRect(tileSize / 2.6, tileSize / 1.3, tileSize / 18, tileSize / 16)
    ctx.fillRect(tileSize / 3, tileSize / 1.8, tileSize / 18, tileSize / 16)
    ctx.fillRect(tileSize / 1.6, tileSize / 1.4, tileSize / 18, tileSize / 16)

    ctx.beginPath();
    ctx.fillStyle = "#24DA1D";

    // leaves
    ctx.moveTo(6 * tileMod, 2 * tileMod);
    ctx.lineTo(1 * tileMod, 8 * tileMod);
    ctx.lineTo(6 * tileMod, 6 * tileMod);
    ctx.lineTo(11 * tileMod, 11 * tileMod);
    ctx.lineTo(16 * tileMod, 6 * tileMod);
    ctx.lineTo(21 * tileMod, 8 * tileMod);
    ctx.lineTo(17 * tileMod, 2 * tileMod);

    ctx.moveTo(tileSize / 2, 2 * tileMod);
    ctx.lineTo(8 * tileMod, 0 * tileMod);
    ctx.lineTo(15 * tileMod, 0 * tileMod);
    ctx.lineTo(tileSize / 2, 2 * tileMod);
    
    ctx.fill();
    ctx.closePath();

    ctx.restore();
  }
}
