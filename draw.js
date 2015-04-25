
function draw(){
	//renderMap();
	ctx.drawImage(mapBoundaries, xOffset, yOffset, mapWidth * tileSize, mapHeight * tileSize);
	renderPacs();
	if(showDebug)
		drawWaypoints();

	drawCurrentFruit();

	sprites.forEach(function(sprite){
		if(sprite.type == "fruit"){
			sprite.draw();
		}
	});

	sprites.forEach(function(sprite){
		if(sprite.type != "fruit"){
			if(sprite.queuedMovement);
				sprite.doMoveInits();
			sprite.interpolateMovements();
			sprite.draw();
		}
	});
	drawDebugInfo();
	drawScore();
	drawLives();
}

function drawWaypoints() {
	// draws the waypoints as red circles;
	ctx.save();
	ctx.strokeStyle = "red";
	ctx.beginPath();
	for (wp in wayPoints) {
		ctx.moveTo(xOffset + (wayPoints[wp][0] * tileSize) + (tileSize / 4) + (tileSize / 2), yOffset + (wayPoints[wp][1] * tileSize) + (tileSize / 2));
		ctx.arc(xOffset + (wayPoints[wp][0] * tileSize) + (tileSize / 2), yOffset + (wayPoints[wp][1] * tileSize) + (tileSize / 2), tileSize / 4, Math.PI * 2, -Math.PI * 2)
		if ((wayPoints[wp][0] == pacman.xTilePos) && (wayPoints[wp][1] == pacman.yTilePos)) {
			wayPoints[wp][2].forEach(function(children){
				ctx.moveTo(xOffset + (wayPoints[wp][0] * tileSize) + (tileSize / 2), yOffset + (wayPoints[wp][1] * tileSize) + (tileSize / 2));
				ctx.lineTo(xOffset + (wayPoints[children[0]][0] * tileSize) + (tileSize / 2), yOffset + (wayPoints[children[0]][1] * tileSize) + (tileSize / 2));
			})
		}
	}
	ctx.stroke();
	ctx.closePath();
	ctx.restore();
}

function drawCurrentFruit(){
	for(var i = 0;i < fruits.length; ++i){
		fruits[i].draw(xOffset + mapWidth * tileSize - (tileSize * (i + 1)) - tileSize / 2 - (tileSize / 3) * i, yOffset + mapHeight * tileSize)
	}
}

function drawLives(){
	topAngle = Math.PI + 0.5;
	bottomAngle = Math.PI - 0.5;

	for(var i = 0; i < pacman.lives; ++i){
		ctx.save();
		ctx.translate(xOffset + 13 + (i * tileSize * 1.4), yOffset + mapHeight * tileSize);
		ctx.fillStyle = pacman.colors[0];
	 	ctx.beginPath();
	    ctx.arc(tileSize / 2, tileSize / 2, (tileSize * 0.6), topAngle, bottomAngle, false);
	    ctx.lineTo(tileSize / 2, tileSize / 2);
	    ctx.fill();
	    ctx.restore();
	}
}

function drawScore(){
	ctx.font = (tileSize * 1.2) + "px 'Luckiest Guy'";
  	ctx.fillStyle = "yellow";
  	ctx.fillText("Score " + pad(score.total(), 8), xOffset + 10, yOffset - 5);
}

function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

function drawDebugInfo(){
	var panel = document.getElementById("debugInfo");

	var info = "<pre>";
	var direction = "";
	sprites.forEach(function(sprite){ if(sprite.type == "fruit") return;
		if(sprite.leftState)
			direction = "Left";
		if(sprite.upState)
			direction = "Up";
		if(sprite.rightState)
			direction = "Right";
		if(sprite.downState)
			direction = "Down";

		info += sprite.name + "\n";
		info += "\tTile X: " + sprite.xTilePos + "\n";
		info += "\tTile Y: " + sprite.yTilePos + "\n";
		info += "\tX: " + (sprite.xPos | 0) + "\n";
		info += "\tY: " + (sprite.yPos | 0) + "\n";
		if(sprite.type == "ghost")
			info += "\tState: " + sprite.AIstate + "\n";
		info += "\tDirection: " + direction + "\n";
		info += "\tIs Moving: " + (sprite.moving ? "True" : "False") + "\n";
		if(wayPoints[sprite.nextWayPoint]){
			info += "\tDestination Waypoint Data: x(" + wayPoints[sprite.nextWayPoint][0] + ") - y("+ wayPoints[sprite.nextWayPoint][1] +")\n";
			if(sprite.childWaypoints){
				info += "\tChildren of Waypoints: " + sprite.childWaypoints.length + "\n";
				for(var wpCount = 0; wpCount < 4; wpCount++){
					info += "\tChild Waypoint Data: ";
					if(sprite.childWaypoints[wpCount]){
						info += "x(" + sprite.childWaypoints[wpCount][0] + ") - y("+ sprite.childWaypoints[wpCount][1] +")\n"
					} else {
						info += "\n";
					}
				}
			}
		}
		info += "\n";
	});

	info += "</pre>"

	panel.innerHTML = info;
}