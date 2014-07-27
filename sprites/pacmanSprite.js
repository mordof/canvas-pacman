function pacmanSpriteBase(){
	this.name = "Pacman";
	this.type = "pacman";
	this.width = (tileSize * 0.8) | 0;
	this.height = (tileSize * 0.8) | 0;
	this.xTilePos = 14;	// current/last actual x
	this.yTilePos = 24;	// current/last actual y
	this.xPos = tileSize * 14 + tileSize / 2;
	this.yPos = tileSize * 24;
	this.animationFirstDuration = 150;
	this.animationSecondDuration = 150;
	this.mouthOpenAngle = 0.7;
	this.mouthClosedAngle = 0;
	this.angleDelta = this.mouthOpenAngle;
	this.animationState = 'closing';
	this.colors = ["yellow", "red", "blue", "green", "orange", "white"];
	this.maniac = false;
	this.lives = 3;
	this.collisionRadius = tileSize * 0.4;
	this.alive = true;
	this.ghostKillCounter = 1;
}

pacmanSpriteBase.prototype = new spriteBase();
pacmanSpriteBase.prototype.constructor = pacmanSpriteBase;

pacmanSpriteBase.prototype.clearGhostCounter = function(){
	this.ghostKillCounter = 1;
}

pacmanSpriteBase.prototype.__interpolateMovements = pacmanSpriteBase.prototype.interpolateMovements;
pacmanSpriteBase.prototype.interpolateMovements = function(){
	if(!allowMovement) return false;

	this.__interpolateMovements();

	if(showDebug){
		ctx.save();
		ctx.beginPath();
		ctx.strokeStyle = "orange";
		ctx.arc(xOffset + this.xPos + tileSize / 2, yOffset + this.yPos + tileSize / 2, this.collisionRadius, Math.PI * 2, -Math.PI * 2, false)
		ctx.stroke();
		ctx.closePath();
		ctx.restore();
	}

	var pacX = xOffset + this.xPos + tileSize / 2;
	var pacY = yOffset + this.yPos + tileSize / 2;

	var spriteX = 0;
	var spriteY = 0;
	var dx = 0;
	var dy = 0;
	var distance = 0;

	for(var i = 1;i<sprites.length;++i){
		spriteX = xOffset + sprites[i].xPos + tileSize / 2;
		spriteY = yOffset + sprites[i].yPos + tileSize / 2;

		dx = pacX - spriteX;
		dy = pacY - spriteY;
		distance = Math.sqrt(dx * dx + dy * dy);

		if(distance < this.collisionRadius + sprites[i].collisionRadius) {
			switch(sprites[i].type){
				case "ghost":
					if(ghostCollision){
						if(sprites[i].panicked){
							if(sprites[i].death()){
								score.add("ghost", this.ghostKillCounter);
								this.ghostKillCounter = this.ghostKillCounter * 2;
							}
						} else if(!sprites[i].dead) {
							this.alive = false;
							this.lives--;
							allowMovement = false;
							setTimeout(function(){
								deathSequence();
							},2000)
						}
					}
					break;
				case "fruit":
					score.add(sprites[i].name.toLowerCase(), 1);
					//this.score += sprites[i].value;
					sprites.splice(i, 1);
					i--;
					break;
			}
		}
	}
}

function deathSequence(){
	pacman.xTilePos = 14;	// current/last actual x
	pacman.yTilePos = 24;	// current/last actual y
	pacman.xPos = tileSize * 14 + tileSize / 2;
	pacman.yPos = tileSize * 24;
	pacman.angleDelta = pacman.mouthOpenAngle;
	pacman.animationState = 'closing';
	pacman.maniac = false;

	for(var i = 1;i < sprites.length;++i){ if(sprites[i].type !== "ghost") { continue; }
		sprites[i].xTilePos = 14;	// current/last actual x
		sprites[i].yTilePos = 15;	// current/last actual y
		sprites[i].xPos = tileSize * 14 + (tileSize / 2);
		sprites[i].yPos = tileSize * 15;
		sprites[i].leftState = false;
		sprites[i].downState = false;
		sprites[i].rightState = false;
		sprites[i].upState = true;
		sprites[i].moving = false;
		sprites[i].queuedMovement = true;
		sprites[i].AIstate = 'inPen';
		sprites[i].nextWayPoint = 1;
	}

	allowMovement = true;
}

pacmanSpriteBase.prototype.checkForPac = function(x, y){
	if(maps[0][y][x] == 2){
		maps[0][y][x] = 1;
		score.add("pac", 1);
	}
	if(maps[0][y][x] == 3){
		maps[0][y][x] = 1;
		for(var i = 1; i < sprites.length; ++i){
			if(sprites[i].type == "ghost")
				sprites[i].panic();
		}
		score.add("bigPac", 1);
	}
}

pacmanSpriteBase.prototype.draw = function(){
	if(this.moving || this.queuedMovement) {
		if(this.animationState == "closing") {
			this.angleDelta = this.angleDelta - (this.mouthOpenAngle * (frameData.delta / this.animationFirstDuration));
			if(this.angleDelta < this.mouthClosedAngle){
				this.angleDelta = this.mouthClosedAngle;
				this.animationState = "opening";
			}
		} else if(this.animationState == "opening") {
			this.angleDelta = this.angleDelta + (this.mouthOpenAngle * (frameData.delta / this.animationSecondDuration));
			if(this.angleDelta > this.mouthOpenAngle){
				this.angleDelta = this.mouthOpenAngle;
				this.animationState = "closing";
			}
		}
	} else {
		this.angleDelta = 0.5;
	}

	switch(this.facing){
		case "right":
			topAngle = this.angleDelta;
			bottomAngle = 6.3 - this.angleDelta;
			break;
		case "down": 
			topAngle = (Math.PI / 2) + this.angleDelta;
			bottomAngle = (Math.PI / 2) - this.angleDelta;
			break;
		case "up": 
			topAngle = ((Math.PI * 3) / 2) + this.angleDelta;
			bottomAngle = ((Math.PI * 3) / 2) - this.angleDelta;
			break;
		case "left": 
			topAngle = Math.PI + this.angleDelta;
			bottomAngle = Math.PI - this.angleDelta;
			break;
	}

	if(this.angleDelta < 0.001){
		topAngle = Math.PI * 2;
		bottomAngle = -Math.PI * 2;
	}

	ctx.save();
	ctx.translate(xOffset + this.xPos, yOffset + this.yPos);
	ctx.fillStyle = this.maniac ? this.colors[(Math.random() * this.colors.length) | 0] : this.colors[0];
 	ctx.beginPath();
    ctx.arc(tileSize / 2, tileSize / 2, (tileSize * 0.8), topAngle, bottomAngle, false);
    ctx.lineTo(tileSize / 2, tileSize / 2);
    ctx.fill();
    ctx.restore();
}