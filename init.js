window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                               window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

document.addEventListener("DOMContentLoaded", function() {  // non jQuery document ready
	pacmanCanvasEle = document.querySelector('canvas');   // canvas object
	ctx = pacmanCanvasEle.getContext('2d');				// screen surface context

	if(!showDebug) document.getElementById("debugInfo").style.display = "none";

	pacmanCanvasEle.width = window.innerWidth;
	pacmanCanvasEle.height = window.innerHeight;

  score = new scoreKeeper();

	pacman = new pacmanSpriteBase();
	ghost = new ghostSpriteBase();

  // ghost is our red guy.
  // we want him to sit outside the box, and to go either left or right immediately
  // these are the necessary variables set to make that happen
  ghost.xTilePos = 23; // current/last actual x
  ghost.yTilePos = 12; // current/last actual y
  ghost.xPos = tileSize * ghost.xTilePos + (tileSize / 2);
  ghost.yPos = tileSize * ghost.yTilePos;
  ghost.AIstate = "roaming";
  var headLeft = (Math.random() * 100) > 50
  ghost.nextWayPoint = wayPointLookup[0][ghost.yTilePos][ghost.xTilePos + (headLeft ? -1 : 1)];
  ghost.facing = headLeft ? "left" : "right";
  ghost.upState = false;
  if(headLeft)
    ghost.leftState = true;
  else
    ghost.rightState = true;

	cherry = new cherrySpriteBase();
	strawberry = new strawberrySpriteBase();
	peach = new peachSpriteBase();
	apple = new appleSpriteBase();
	watermelon = new watermelonSpriteBase();

	fruits = [cherry, strawberry, peach, apple, watermelon];

	ghost.color = "#FF3333";
	ghost.name = "Red Ghost";

	var ghosty= null;

	var colors = ["#00FFFF", "#FF9933", "#80FF00"]
	var names = ["Turqoise Ghost", "Orange Ghost", "Green Ghost"]

	sprites.push(pacman, ghost, cherry);

	for(var i =0;i<3;++i){
		ghosty = new ghostSpriteBase();
		ghosty.color = colors[i];
		ghosty.name = names[i]
		sprites.push(ghosty);
	}

	renderMap();

	//initialMapCheck();

  requestAnimationFrame(frameStep);
});

var frameData = {
	start: null,
	end: 0,
	delta: 0,
	frame: 0,
	fps: 0,
	fpsLastCalced: 0
}

function frameStep(timestamp){
	if(frameData.start === null) {
		frameData.start = timestamp;
	}
	else {
		frameData.start = frameData.end;
	}

	frameData.end = timestamp;
	frameData.delta = frameData.end - frameData.start;
	++frameData.frame;
	++frameData.fps;

	//fps stuff
	if ((frameData.end - frameData.fpsLastCalced) >= 1000 ) {
		frameData.fpsLastCalced = frameData.end;
		//document.getElementById("fps").innerHTML = "FPS: " + frameData.fps;
		frameData.fps = 0;
	}

	ctx.fillStyle = "black";
  	ctx.fillRect(0, 0, pacmanCanvasEle.width, pacmanCanvasEle.height);

	draw();

	requestAnimationFrame(frameStep);
}
