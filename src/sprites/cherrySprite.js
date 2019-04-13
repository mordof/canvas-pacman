function cherrySpriteBase() {
  this.name = "Cherry";
  this.type = "fruit";
  this.width = (tileSize * 0.8) | 0;
  this.height = (tileSize * 0.8) | 0;
  this.xTilePos = 14;	// current/last actual x
  this.yTilePos = 18;	// current/last actual y
  this.xPos = tileSize * 14 + (tileSize / 2);
  this.yPos = tileSize * 18;
  this.collisionRadius = tileSize * 0.4;
  this.value = 100;
}

cherrySpriteBase.prototype = new spriteBase();
cherrySpriteBase.prototype.constructor = cherrySpriteBase;

cherrySpriteBase.prototype.draw = function(x, y){
  ctx.save();
  if(arguments.length == 0)
    ctx.translate(xOffset + this.xPos, yOffset + this.yPos);
  else
    ctx.translate(x, y);

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