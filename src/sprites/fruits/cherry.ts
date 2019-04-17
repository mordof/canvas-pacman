import FruitBase from './fruit-base';
import map from '../../map';

export default class CherrySprite extends FruitBase {
  width = 0; // tileSize * 0.8 | 0;
  height = 0; // tileSize * 0.8 | 0;
  xTilePos = 14;
  yTilePos = 18;
  xPos = 0; // tileSize * 14 + (tileSize / 2);
  yPos = 0; // tileSize * 18;
  collisionRadius = 0; // tileSize * 0.4
  value = 100;

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.translate(this.xPos, this.yPos);
    
    ctx.beginPath();
    ctx.fillStyle = "red";

    // the two cherries
    ctx.arc(map.tileSize / 8, map.tileSize - (map.tileSize / 2.8), map.tileSize / 4, Math.PI * 2, -Math.PI * 2, false);
    ctx.arc(map.tileSize - map.tileSize / 3, map.tileSize - (map.tileSize / 4), map.tileSize / 4, Math.PI * 2, -Math.PI * 2, false);

    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.fillStyle = "#670303";

    // the two cherry darker red stem start ovals
    ctx.arc(map.tileSize / 7.2, map.tileSize - (map.tileSize / 2.25), map.tileSize / 14, Math.PI * 2, -Math.PI * 2, false);
    ctx.arc(map.tileSize - map.tileSize / 3, map.tileSize - (map.tileSize / 3), map.tileSize / 14, Math.PI * 2, -Math.PI * 2, false);

    ctx.fill();
    ctx.closePath();

    // the two stems
    ctx.beginPath();
    ctx.strokeStyle = "#959817";
    ctx.lineWidth = 2

    ctx.moveTo(map.tileSize / 8, map.tileSize - (map.tileSize / 2))
    ctx.bezierCurveTo(map.tileSize / 6, map.tileSize / 1.5, map.tileSize / 7, map.tileSize / 4, map.tileSize - map.tileSize / 4, map.tileSize / 8)
    ctx.moveTo(map.tileSize - map.tileSize / 2.5, map.tileSize - map.tileSize / 3)
    ctx.bezierCurveTo(map.tileSize / 1.3, map.tileSize / 1.5, map.tileSize / 3, map.tileSize / 2.5, map.tileSize - map.tileSize / 4, map.tileSize / 8)

    ctx.stroke();
    ctx.closePath();

    ctx.fillStyle = "#959817";
    ctx.fillRect(map.tileSize - map.tileSize / 3, map.tileSize / 12, map.tileSize / 9, map.tileSize / 9)

    ctx.restore();
  }
}