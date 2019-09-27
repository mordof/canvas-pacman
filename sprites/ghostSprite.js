function ghostSpriteBase() {
	this.name = "Ghost";
	this.type = "ghost";
	this.width = (tileSize * 0.8) | 0;
	this.height = (tileSize * 0.8) | 0;
	this.xTilePos = 24;	// current/last actual x
	this.yTilePos = 15;	// current/last actual y
	this.xPos = tileSize * this.xTilePos + (tileSize / 2);
	this.yPos = tileSize * this.yTilePos;
	this.upState = true;
	this.queuedMovement = true;
	this.wayPoints = [[24, 15, "upState"], [24, 12, "leftState"], [23, 12]]
	this.deathWaypointPath = null;
	this.nextWayPoint = 1;
	this.tileSpeed = 5;
	this.collisionRadius = tileSize * 0.4;
	this.color = null;
	this.dead = false;
	this.deathTimeout = 5000;
	this.animShift = 0;
	this.eyeColor = "white";
	this.pupilColor = "blue";
	this.panicked = false;
	this.panicColors = {
		inverted: false,
		base: "blue",
		eye: "white",
		pupil: "blue",
		invertBase: "white",
		invertEye: "blue",
		invertPupil: "white"
	}
	this.calmTileSpeed = 5;
	this.deadTileSpeed = 12;
	this.panicTileSpeed = 2.5;
	this.panicDuration = 6000;
	this.panicEndWarningDuration = 2000;
	this.panicSlowFlash = 250;
	this.panicQuickFlash = 100;
	this.panicIntervalHandle = null;
	this.AIstate = 'inPen';
}

ghostSpriteBase.prototype = new spriteBase();
ghostSpriteBase.prototype.constructor = ghostSpriteBase;

ghostSpriteBase.prototype.death = function(){
	if(this.dead) return false;

	this.dead = true;
	this.tileSpeed = this.deadTileSpeed;
	this.AIstate = "headingHome";
	this.deathWaypointPath = getWaypointsToDest(0, this.nextWayPoint, wayPointLookup[0][this.wayPoints[this.wayPoints.length-1][1]][this.wayPoints[this.wayPoints.length-1][0]]);

	return true;
}

ghostSpriteBase.prototype.revive = function(){
	this.dead = false;
	this.tileSpeed = this.calmTileSpeed;
}

ghostSpriteBase.prototype.panic = function(){
	if(this.dead) return false;
	var self = this;
	this.panicked = true;
	this.tileSpeed = this.panicTileSpeed;

	this.panicIntervalHandle = setInterval(function(){ self.panicColors.inverted = !self.panicColors.inverted }, this.panicSlowFlash);

	setTimeout(function(){
		clearInterval(self.panicIntervalHandle);
		self.panicIntervalHandle = setInterval(function(){ self.panicColors.inverted = !self.panicColors.inverted }, self.panicQuickFlash);
	}, this.panicDuration - this.panicEndWarningDuration)

	setTimeout(function(){ self.calm(); pacman.clearGhostCounter(); }, this.panicDuration);
}

ghostSpriteBase.prototype.calm = function(){
	this.panicked = false;
	if(!this.dead)
		this.tileSpeed = this.calmTileSpeed;

	clearInterval(this.panicIntervalHandle);
}

ghostSpriteBase.prototype.__interpolateMovements = ghostSpriteBase.prototype.interpolateMovements;
ghostSpriteBase.prototype.interpolateMovements = function(){
	this.__interpolateMovements();

	if(showDebug){
		ctx.save();
		ctx.beginPath();
		ctx.strokeStyle = "red";
		ctx.arc(xOffset + this.xPos + tileSize / 2, yOffset + this.yPos + tileSize / 2, this.collisionRadius, Math.PI * 2, -Math.PI * 2, false)
		ctx.stroke();
		ctx.closePath();
		ctx.restore();
	}
}

ghostSpriteBase.prototype.doMoveInits = function() {
 // do the key-based movements
  if (this.moving && (!this.isOppositeStateDown())) return false;

  this.queuedMovement = false;
  
  if (this.leftState) {
  	if (this.xTilePos > 0) {
	    if (maps[0][this.yTilePos][this.xTilePos - 1] || maps[0][this.yTilePos][this.xTilePos - 1] == null) {
	       this.facing = 'left';
	       this.moving = true;
	       this.xTilePos -= 1;
	    } 
	}
  } else if (this.rightState) {
  	if (this.xTilePos < mapWidth - 1) {
	    if (maps[0][this.yTilePos][this.xTilePos + 1] || maps[0][this.yTilePos][this.xTilePos + 1] === null) {
	      this.facing = 'right';
	      this.moving = true;
	      this.xTilePos += 1;
	    }
	}
  } else if (this.upState) {
  	if (this.yTilePos > 0) {
	    if (maps[0][this.yTilePos - 1][this.xTilePos] || maps[0][this.yTilePos - 1][this.xTilePos] === null) {
	      this.facing = 'up';
	      this.moving = true;
	      this.yTilePos -= 1;
	    }
	}
  } else if (this.downState) {
  	if (this.yTilePos < mapHeight - 1) {
	    if (maps[0][this.yTilePos + 1][this.xTilePos] || maps[0][this.yTilePos + 1][this.xTilePos] === null) {
	      this.facing = 'down';
	      this.moving = true;
	      this.yTilePos += 1;
	    }
	}
  }
}

ghostSpriteBase.prototype.gridUpdated = function(){
	//ghost has updated thier grid location
	//a move has finished, we can make decisions and do AI stuff here
	if(this.AIstate == 'inPen')
		targetWaypoint = this.wayPoints[this.nextWayPoint];
	else if(this.AIstate == "headingHome")
		targetWaypoint = wayPoints[this.deathWaypointPath[0]];
	else if(this.AIstate == "enteringHomeDead")
		targetWaypoint = this.wayPoints[this.nextWayPoint];
	else
		targetWaypoint = wayPoints[this.nextWayPoint];

	// if we've arrived at a waypoint
	if(targetWaypoint && this.xTilePos == targetWaypoint[0] && this.yTilePos == targetWaypoint[1]){
		this.leftState = false;
		this.upState = false;
		this.downState = false;
		this.rightState = false;

		if (this.AIstate == "headingHome") {
			// find the direction to go between the point we're currently at, and the next point in the death path
			// and set the leftState/rightState/upState/downState to true as necessary
			if(this.deathWaypointPath.length > 1)
				this[areJunctionsConnected(0, this.deathWaypointPath[0], this.deathWaypointPath[1])] = true;
			else
				this[getOppositeState(this.wayPoints[this.wayPoints.length - 2][2])] = true;

			this.deathWaypointPath.shift();

			if(this.deathWaypointPath.length == 0){
				this.AIstate = "enteringHomeDead";
				this.nextWayPoint = 1;
			}
		} else if (this.AIstate == "enteringHomeDead") {
			this.nextWayPoint--;
			if(this.nextWayPoint == -1){
				this.AIstate = "inPen";
				this.dead = false;
				this.moving = false;
				this.calm();
				var self = this;

				// give a timeout for him to leave the pen again.
				setTimeout(function(){
					self.nextWayPoint = 1;
					self.moving = true;
					self[self.wayPoints[0][2]] = true;
				}, this.deathTimeout);
			} else {
				this[getOppositeState(this.wayPoints[this.nextWayPoint][2])] = true;
			}
		} else if (this.AIstate == "inPen") {
			this[targetWaypoint[2]] = true;
			++this.nextWayPoint;

			// we've run out of waypoints and should be "out of the pen" by this point. switch to roaming.
			// if for whatever reason, the ghost is not out of the pen here.... you're an idiot. 
			// (check your last "In Pen" waypoint and ensure it matches a global waypoint location)
			if(this.nextWayPoint == this.wayPoints.length - 1){
				this.nextWayPoint = wayPointLookup[0][this.wayPoints[this.nextWayPoint][1]][this.wayPoints[this.nextWayPoint][0]]
				this.AIstate = 'roaming';
			}
		} else { // default state of "roaming"
			// we're currently on a waypoint. get the ID.
			wayPointID = wayPointLookup[0][this.yTilePos][this.xTilePos]
			pacmanWaypointID = wayPointLookup[0][pacman.yTilePos][pacman.xTilePos]

			waypoints = getWaypointsToDest(0, wayPointID, pacmanWaypointID)

			if(waypoints && waypoints.length > 1)
				direction = areJunctionsConnected(0, wayPointID, waypoints[1])
			else
				direction = false

			nextWaypoint = waypoints[1]

			// the code above tells the ghosts to head right for pacman... but
			// for the example currently i don't really want that.
			// so we'll force them to go back to default and just roam randomly

			direction = false

			if(direction === false){
				// // choose the next waypoint
				newWaypoints = filterWaypointsByDirection(wayPoints[wayPointID][2], this.facing);
				this.childWaypoints = wayPoints[wayPointID][2];

				newWayPoint = newWaypoints[(Math.random() * newWaypoints.length) | 0];

				nextWaypoint = newWayPoint[0]
				direction = newWayPoint[1]
			}



			this.nextWayPoint = nextWaypoint;
			this[direction] = true;
		}
	}
}

function filterWaypointsByDirection(waypoints, direction) {
	filteredWaypoints = [];

	waypoints.forEach(function(waypoint){
		if(getOppositeState(direction) !== waypoint[1])
			filteredWaypoints.push(waypoint)
	});

	return filteredWaypoints;
}

ghostSpriteBase.prototype.draw = function() {
	this.animShift = this.animShift

	var zScaler = tileSize / 18;
	var xEyeOffset = 0; yEyeOffset = 0;
	var eyeSize = 4 * zScaler;
	switch (this.facing) {
		case 'left':
			xEyeOffset = (-2 * zScaler);
			break;
		case 'right':
			xEyeOffset = (2 * zScaler);
			break;
		case 'up':
			yEyeOffset = (-2 * zScaler);
			break;
		case 'down':
			yEyeOffset = (2 * zScaler);
			break;
	}

	ctx.save();
	ctx.translate(xOffset + this.xPos - (tileSize / 3), yOffset + this.yPos - (tileSize/4));
	if(!this.dead){
		ctx.fillStyle = this.panicked ? (this.panicColors.inverted ? this.panicColors.invertBase : this.panicColors.base) : this.color;
		ctx.beginPath();
	    ctx.moveTo(1*zScaler,28*zScaler);
	    ctx.lineTo(1*zScaler,14*zScaler);
	    ctx.bezierCurveTo(1*zScaler,6*zScaler,6*zScaler,0*zScaler,15*zScaler,0*zScaler);
	    ctx.bezierCurveTo(23*zScaler,0*zScaler,29*zScaler,6*zScaler,29*zScaler,14*zScaler);
	    ctx.lineTo(29*zScaler,28*zScaler);
	    ctx.lineTo(24.333*zScaler,23.333*zScaler);
	    ctx.lineTo(19.666*zScaler,28*zScaler);
	    ctx.lineTo(15*zScaler,23.333*zScaler);
	    ctx.lineTo(10.333*zScaler,28*zScaler);
	    ctx.lineTo(5.666*zScaler,23.333*zScaler);
	    ctx.lineTo(1*zScaler,28*zScaler);
	    ctx.fill();
	}

	if(this.dead){
		ctx.fillStyle = this.eyeColor;
	} else {
		ctx.fillStyle = this.panicked ? (this.panicColors.inverted ? this.panicColors.invertEye : this.panicColors.eye) : this.eyeColor;
	}
    
    ctx.beginPath();
    ctx.moveTo(9*zScaler,8*zScaler);
    ctx.bezierCurveTo(6*zScaler,8*zScaler,5*zScaler,11*zScaler,5*zScaler,13*zScaler);
    ctx.bezierCurveTo(5*zScaler,15*zScaler,6*zScaler,18*zScaler,9*zScaler,18*zScaler);
    ctx.bezierCurveTo(12*zScaler,18*zScaler,13*zScaler,15*zScaler,13*zScaler,13*zScaler);
    ctx.bezierCurveTo(13*zScaler,11*zScaler,12*zScaler,8*zScaler,9*zScaler,8*zScaler);
    ctx.moveTo(21*zScaler,8*zScaler);
    ctx.bezierCurveTo(18*zScaler,8*zScaler,17*zScaler,11*zScaler,17*zScaler,13*zScaler);
    ctx.bezierCurveTo(17*zScaler,15*zScaler,18*zScaler,18*zScaler,21*zScaler,18*zScaler);
    ctx.bezierCurveTo(24*zScaler,18*zScaler,25*zScaler,15*zScaler,25*zScaler,13*zScaler);
    ctx.bezierCurveTo(25*zScaler,11*zScaler,24*zScaler,8*zScaler,21*zScaler,8*zScaler);
    ctx.fill();
    ctx.closePath();

    if(this.dead){
    	ctx.fillStyle = this.pupilColor;
    } else {
    	ctx.fillStyle = this.panicked ? (this.panicColors.inverted ? this.panicColors.invertPupil : this.panicColors.pupil) : this.pupilColor;
    }

    ctx.beginPath();
    ctx.fillRect((7*zScaler)+xEyeOffset,(11*zScaler)+yEyeOffset,eyeSize,eyeSize);
    ctx.fillRect((19*zScaler)+xEyeOffset,(11*zScaler)+yEyeOffset,eyeSize,eyeSize);
    ctx.fill();
    ctx.restore();
}
