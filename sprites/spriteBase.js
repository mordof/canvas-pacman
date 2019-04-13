function spriteBase(){
  this.xTilePos = 0;	// current/last actual x
  this.yTilePos = 0;	// current/last actual y
  this.moving = false;
  this.queuedMovement = false;
  this.xPos = 0;
  this.yPos = 0;
  this.leftState = false;
  this.rightState = false;
  this.upState = false;
  this.downState = false;
  this.width = 0;
  this.height = 0;
  this.facing = 'right';
  this.tileSpeed = 6;
}

spriteBase.prototype.isOppositeStateDown = function() {
  switch (this.facing) {
    case 'left': return this.rightState; break;
    case 'right': return this.leftState; break;
    case 'up': return this.downState; break;
    case 'down': return this.upState; break;
  }
}

spriteBase.prototype.resetStateToFacing = function(){
  this.rightState = false;
  this.leftState = false;
  this.upState = false;
  this.downState = false;

  switch (this.facing){
    case 'left': this.leftState = true; break;
    case 'right': this.rightState = true; break;
    case 'up': this.upState = true; break;
    case 'down': this.downState = true; break;
  }
}

function getOppositeState(state){
  switch (state) {
    case 'left':
    case 'leftState': return 'rightState'; break;
    case 'right':
    case 'rightState': return 'leftState'; break;
    case 'up':
    case 'upState': return 'downState'; break;
    case 'down':
    case 'downState': return 'upState'; break;
  }
}

spriteBase.prototype.gridUpdated = function(){}
spriteBase.prototype.checkForPac = function(x, y){}

spriteBase.prototype.changeDirection = function(direction){
  this.facing = direction;
}

spriteBase.prototype.doMoveInits = function() {
 // do the key-based movements
  if (this.moving && (!this.isOppositeStateDown())) return false;

  if (this.leftState) {
    if (this.xTilePos > 0) {
      if (maps[0][this.yTilePos][this.xTilePos - 1]) {
         this.facing = 'left';
         this.moving = true;
         this.xTilePos -= 1;
         this.queuedMovement = false;
      } else if (this.facing != 'left') {
        this.moving = true;
        this.resetStateToFacing();
      }
    }
  } else if (this.rightState) {
    if (this.xTilePos < mapWidth - 1) {
      if (maps[0][this.yTilePos][this.xTilePos + 1]) {
        this.facing = 'right';
        this.moving = true;
        this.xTilePos += 1;
        this.queuedMovement = false;
        //if (maps[0][this.yTilePos][this.xTilePos + 1] == 9) { this.xTilePos = 0 } else { this.xTilePos += 1 };
      } else if (this.facing != 'right') {
        this.moving = true;
        this.resetStateToFacing();
      }
    }
  } else if (this.upState) {
    if (this.yTilePos > 0) {
      if (maps[0][this.yTilePos - 1][this.xTilePos]) {
        this.facing = 'up';
        this.moving = true;
        this.yTilePos -= 1;
        this.queuedMovement = false;
      } else if (this.facing != 'up') {
        this.moving = true;
        this.resetStateToFacing();
      }
    }
  } else if (this.downState) {
    if (this.yTilePos < mapHeight - 1) {
      if (maps[0][this.yTilePos + 1][this.xTilePos]) {
        this.facing = 'down';
        this.moving = true;
        this.yTilePos += 1;
        this.queuedMovement = false;
      } else if (this.facing != 'down') {
        this.moving = true;
        this.resetStateToFacing();
      }
    }
  }
}

spriteBase.prototype.interpolateMovements = function() {
  var destXpos, destYpos, speedInPixels;  // where is our line
  destXpos = (this.xTilePos * tileSize);
  destYpos = (this.yTilePos * tileSize);
  speedInPixels = (this.tileSpeed * tileSize) * (frameData.delta / 1000);
  if (!this.moving || !allowMovement) return false;

  switch (this.facing) {  
    case 'left':
      this.xPos -= speedInPixels;
        if (this.xPos <= destXpos) {
          if (maps[0][this.yTilePos][this.xTilePos] == 9) { this.xTilePos = mapWidth-1; this.xPos = (tileSize*(mapWidth-1)) } else { this.xPos = destXpos };
          //this.xPos = destXpos; //if we moved to or beyond, set at pos
          this.gridUpdated();
          this.moving = false; //done moving 
        } 
      break;
    case 'right':
      this.xPos += speedInPixels;
      if (this.xPos >= destXpos) {
        if (maps[0][this.yTilePos][this.xTilePos] == 9) { this.xTilePos = 0; this.xPos = 0 } else { this.xPos = destXpos };
        //this.xPos = destXpos;
        this.gridUpdated();
        this.moving = false;
      }
      break;
    case 'up':
      this.yPos -= speedInPixels;
      if (this.yPos <= destYpos) {
          if (maps[0][this.yTilePos][this.xTilePos] == 9) { this.yTilePos = mapHeight-1; this.yPos = (tileSize*(mapHeight-1)) } else { this.yPos = destYpos };
          //this.yPos = destYpos; //if we moved to or beyond, set at pos
          this.gridUpdated();
          this.moving = false; //done moving 
        } 
      break;
    case 'down':
      this.yPos += speedInPixels;
      if (this.yPos >= destYpos) {
        if (maps[0][this.yTilePos][this.xTilePos] == 9) { this.yTilePos = 0; this.yPos = 0 } else { this.yPos = destYpos };
        this.gridUpdated();
        this.moving = false;
      }
      break;
  }

  // if we arrived on a tile
  if (!this.moving) {
    this.checkForPac(this.xTilePos, this.yTilePos);
  }  

  if (this.leftState || this.rightState || this.upState || this.downState) this.queuedMovement = true;
}