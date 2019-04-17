import FruitBase from './fruit-base';
import map from '../../map';

export default class PeachSprite extends FruitBase {
  xTilePos = 14;
  yTilePos = 18;
  xPos = 0; 
  yPos = 0;
  collisionRadius = 0.4;
  value = 1000;

  draw(ctx: CanvasRenderingContext2D, x?: number, y?: number) {
    const { tileSize, tileMod, xOffset, yOffset } = map;
    ctx.save();
    if(x > 0 && y > 0)
      ctx.translate(x, y);
    else
      ctx.translate(xOffset + this.xPos, yOffset + this.yPos);

    var grd = ctx.createRadialGradient(tileSize / 2, tileSize / 2 + tileSize / 9, tileSize / 3, tileSize / 3, tileSize / 2 + tileSize / 14, tileSize / 9)
    grd.addColorStop(0, "#C12F2F")
    grd.addColorStop(0.5, "#CA5A26")
    grd.addColorStop(1, "#DE8E26")

    ctx.fillStyle = grd;
    ctx.beginPath();
    ctx.arc(tileSize / 2, tileSize / 2 + tileSize / 9, (tileSize / 2.5), Math.PI * 2, -Math.PI * 2, false);
    ctx.fill();
    ctx.closePath();

    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(tileSize / 2, tileSize / 6, (tileSize / 7), Math.PI * 2, -Math.PI * 2, false);
    ctx.fill();
    ctx.closePath();

    ctx.strokeStyle = "green";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(tileSize / 2, tileSize / 3);
    ctx.lineTo(tileSize / 2, tileSize / 8);
    ctx.lineTo(9 * tileMod, tileSize / 9);
    ctx.stroke();
    ctx.closePath();

    ctx.restore();
  }
}
