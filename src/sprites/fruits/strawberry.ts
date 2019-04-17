import FruitBase from './fruit-base';
import map from '../../map';

export default class StrawberrySprite extends FruitBase {
  width = 0; // tileSize * 0.8 | 0;
  height = 0; // tileSize * 0.8 | 0;
  xTilePos = 14;
  yTilePos = 18;
  xPos = 0; // tileSize * 14 + (tileSize / 2);
  yPos = 0; // tileSize * 18;
  collisionRadius = 0; // tileSize * 0.4
  value = 500;

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.translate(this.xPos, this.yPos);

    ctx.beginPath();
    ctx.fillStyle = "red";

    // berry base
    ctx.moveTo(map.tileSize / 2, map.tileSize - map.tileSize / 18)
    ctx.bezierCurveTo(0, map.tileSize / 1.3, 0, -map.tileSize / 9, map.tileSize / 2, map.tileSize / 6)
    ctx.moveTo(map.tileSize / 2, map.tileSize - map.tileSize / 18)
    ctx.bezierCurveTo(map.tileSize, map.tileSize / 1.3, map.tileSize, -map.tileSize / 9, map.tileSize / 2, map.tileSize / 6)
    
    ctx.fill();
    ctx.closePath();

    ctx.fillStyle = "white";

    // seeds
    ctx.fillRect(map.tileSize / 4, map.tileSize / 3, map.tileSize / 18, map.tileSize / 16)
    ctx.fillRect(map.tileSize / 2, map.tileSize / 4, map.tileSize / 18, map.tileSize / 16)
    ctx.fillRect(map.tileSize - map.tileSize / 3.5, map.tileSize / 2.4, map.tileSize / 18, map.tileSize / 16)
    ctx.fillRect(map.tileSize - map.tileSize / 2.2, map.tileSize / 2, map.tileSize / 18, map.tileSize / 16)
    ctx.fillRect(map.tileSize / 2.6, map.tileSize / 1.3, map.tileSize / 18, map.tileSize / 16)
    ctx.fillRect(map.tileSize / 3, map.tileSize / 1.8, map.tileSize / 18, map.tileSize / 16)
    ctx.fillRect(map.tileSize / 1.6, map.tileSize / 1.4, map.tileSize / 18, map.tileSize / 16)

    ctx.beginPath();
    ctx.fillStyle = "#24DA1D";

    // leaves
    ctx.moveTo(6 * map.tileMod, 2 * map.tileMod);
    ctx.lineTo(1 * map.tileMod, 8 * map.tileMod);
    ctx.lineTo(6 * map.tileMod, 6 * map.tileMod);
    ctx.lineTo(11 * map.tileMod, 11 * map.tileMod);
    ctx.lineTo(16 * map.tileMod, 6 * map.tileMod);
    ctx.lineTo(21 * map.tileMod, 8 * map.tileMod);
    ctx.lineTo(17 * map.tileMod, 2 * map.tileMod);

    ctx.moveTo(map.tileSize / 2, 2 * map.tileMod);
    ctx.lineTo(8 * map.tileMod, 0 * map.tileMod);
    ctx.lineTo(15 * map.tileMod, 0 * map.tileMod);
    ctx.lineTo(map.tileSize / 2, 2 * map.tileMod);
    
    ctx.fill();
    ctx.closePath();

    ctx.restore();
  }
}