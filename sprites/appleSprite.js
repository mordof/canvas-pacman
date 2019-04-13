function appleSpriteBase() {
  this.name = "Apple";
  this.type = "fruit";
  this.width = (tileSize * 0.8) | 0;
  this.height = (tileSize * 0.8) | 0;
  this.xTilePos = 14;	// current/last actual x
  this.yTilePos = 18;	// current/last actual y
  this.xPos = tileSize * 14 + (tileSize / 2);
  this.yPos = tileSize * 18;
  this.collisionRadius = tileSize * 0.4;
  this.value = 2000;
}

appleSpriteBase.prototype = new spriteBase();
appleSpriteBase.prototype.constructor = appleSpriteBase;

appleSpriteBase.prototype.draw = function(x, y){
  ctx.save();
  if(arguments.length == 0)
    ctx.translate(xOffset + this.xPos, yOffset + this.yPos);
  else
    ctx.translate(x, y);

  ctx.fillStyle = "red";
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
  ctx.lineTo(13 * tileMod, tileSize / 9);
  ctx.stroke();
  ctx.closePath();

  ctx.restore();
}