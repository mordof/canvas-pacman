import FruitBase from './fruit-base';
import map from '../../map';

export default class CherrySprite extends FruitBase {
  xTilePos = 14;
  yTilePos = 18;
  xPos = 0;
  yPos = 0;
  collisionRadius = 0.4;
  value = 100;

  draw(ctx: CanvasRenderingContext2D, x?: number, y?: number) {
    const { tileSize, tileMod, xOffset, yOffset } = map;
    ctx.save();
    if(x > 0 && y > 0)
      ctx.translate(x, y);
    else
      ctx.translate(xOffset + this.xPos, yOffset + this.yPos);

    ctx.beginPath();
    ctx.fillStyle = "red";

    // the two cherries
    ctx.arc(tileSize / 8, tileSize - (tileSize / 2.8), tileSize / 4, Math.PI * 2, -Math.PI * 2, false);
    ctx.arc(tileSize - tileSize / 3, tileSize - (tileSize / 4), tileSize / 4, Math.PI * 2, -Math.PI * 2, false);

    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.fillStyle = "#670303";

    // the two cherry darker red stem start ovals
    ctx.arc(tileSize / 7.2, tileSize - (tileSize / 2.25), tileSize / 14, Math.PI * 2, -Math.PI * 2, false);
    ctx.arc(tileSize - tileSize / 3, tileSize - (tileSize / 3), tileSize / 14, Math.PI * 2, -Math.PI * 2, false);

    ctx.fill();
    ctx.closePath();

    // the two stems
    ctx.beginPath();
    ctx.strokeStyle = "#959817";
    ctx.lineWidth = 2

    ctx.moveTo(tileSize / 8, tileSize - (tileSize / 2))
    ctx.bezierCurveTo(tileSize / 6, tileSize / 1.5, tileSize / 7, tileSize / 4, tileSize - tileSize / 4, tileSize / 8)
    ctx.moveTo(tileSize - tileSize / 2.5, tileSize - tileSize / 3)
    ctx.bezierCurveTo(tileSize / 1.3, tileSize / 1.5, tileSize / 3, tileSize / 2.5, tileSize - tileSize / 4, tileSize / 8)

    ctx.stroke();
    ctx.closePath();

    ctx.fillStyle = "#959817";
    ctx.fillRect(tileSize - tileSize / 3, tileSize / 12, tileSize / 9, tileSize / 9)

    ctx.restore();
  }
}
