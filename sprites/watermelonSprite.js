function watermelonSpriteBase() {
  this.name = "Watermelon";
  this.type = "fruit";
  this.width = (tileSize * 0.8) | 0;
  this.height = (tileSize * 0.8) | 0;
  this.xTilePos = 14;	// current/last actual x
  this.yTilePos = 18;	// current/last actual y
  this.xPos = tileSize * 14 + (tileSize / 2);
  this.yPos = tileSize * 18;
  this.collisionRadius = tileSize * 0.4;
  this.value = 5000;
}

watermelonSpriteBase.prototype = new spriteBase();
watermelonSpriteBase.prototype.constructor = watermelonSpriteBase;

watermelonSpriteBase.prototype.draw = function(x, y){
  ctx.save();
  if(arguments.length == 0)
    ctx.translate(xOffset + this.xPos, yOffset + this.yPos);
  else
    ctx.translate(x, y);

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