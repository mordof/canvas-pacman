import FruitBase from './fruit-base';
import map from '../../map';

export default class PeachSprite extends FruitBase {
  width = 0; // tileSize * 0.8 | 0;
  height = 0; // tileSize * 0.8 | 0;
  xTilePos = 14;
  yTilePos = 18;
  xPos = 0; // tileSize * 14 + (tileSize / 2);
  yPos = 0; // tileSize * 18;
  collisionRadius = 0; // tileSize * 0.4
  value = 1000;

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.translate(this.xPos, this.yPos);

    const grd = ctx.createRadialGradient(map.tileSize / 2, map.tileSize / 2 + map.tileSize / 9, map.tileSize / 3, map.tileSize / 3, map.tileSize / 2 + map.tileSize / 14, map.tileSize / 9)
    grd.addColorStop(0, "#C12F2F")
    grd.addColorStop(0.5, "#CA5A26")
    grd.addColorStop(1, "#DE8E26")

    ctx.fillStyle = grd;
    ctx.beginPath();
    ctx.arc(map.tileSize / 2, map.tileSize / 2 + map.tileSize / 9, (map.tileSize / 2.5), Math.PI * 2, -Math.PI * 2, false);
    ctx.fill();
    ctx.closePath();

    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(map.tileSize / 2, map.tileSize / 6, (map.tileSize / 7), Math.PI * 2, -Math.PI * 2, false);
    ctx.fill();
    ctx.closePath();

    ctx.strokeStyle = "green";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(map.tileSize / 2, map.tileSize / 3);
    ctx.lineTo(map.tileSize / 2, map.tileSize / 8);
    ctx.lineTo(9 * map.tileMod, map.tileSize / 9);
    ctx.stroke();
    ctx.closePath();

    ctx.restore();
  }
}