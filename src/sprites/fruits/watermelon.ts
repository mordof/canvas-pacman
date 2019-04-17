import FruitBase from './fruit-base';
import map from '../../map';

export default class WatermelonSprite extends FruitBase {
  width = 0; // tileSize * 0.8 | 0;
  height = 0; // tileSize * 0.8 | 0;
  xTilePos = 14;
  yTilePos = 18;
  xPos = 0; // tileSize * 14 + (tileSize / 2);
  yPos = 0; // tileSize * 18;
  collisionRadius = 0; // tileSize * 0.4
  value = 5000;

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.translate(this.xPos, this.yPos);

    ctx.fillStyle = "#198122"
    ctx.beginPath();
    ctx.moveTo(map.tileSize / 2, map.tileSize / 6)
    ctx.arc(map.tileSize / 2, map.tileSize / 6, map.tileSize / 1.15, 1.1, 2, false)
    ctx.fill()
    ctx.closePath();

    ctx.beginPath();
    ctx.fillStyle = "#ACFB77"
    ctx.moveTo(map.tileSize / 2, map.tileSize / 6)
    ctx.arc(map.tileSize / 2, map.tileSize / 6, map.tileSize / 1.3, 1.1, 2, false)
    ctx.fill()
    ctx.closePath();

    ctx.beginPath();
    ctx.fillStyle = "#F92F2F"
    ctx.moveTo(map.tileSize / 2, map.tileSize / 6)
    ctx.arc(map.tileSize / 2, map.tileSize / 6, map.tileSize / 1.7, 1.1, 2, false)
    ctx.fill()
    ctx.closePath();

    ctx.beginPath();
    ctx.fillStyle = "black"
    ctx.moveTo(12 * map.tileMod, 9 * map.tileMod)
    ctx.arc(12 * map.tileMod, 9 * map.tileMod, map.tileSize / 12, 1.1, 2, false)
    ctx.moveTo(13 * map.tileMod, 12 * map.tileMod)
    ctx.arc(13 * map.tileMod, 12 * map.tileMod, map.tileSize / 12, 1.1, 2, false)
    ctx.moveTo(10.5 * map.tileMod, 12 * map.tileMod)
    ctx.arc(10.5 * map.tileMod, 12 * map.tileMod, map.tileSize / 12, 1.1, 2, false)
    ctx.fill()
    ctx.closePath();
    
    ctx.restore();
  }
}