var r = 150;
var g = 0;
var b = 255;

var rUp = true;
var gUp = true;
var bUp = true;

var pacSize = tileSize / 6;

function renderPacs(){
	ctx.save();
	// draw lines to represent the borders of each map tile
	ctx.strokeStyle = "white";
	ctx.fillStyle = "white";
	ctx.beginPath();
	for(var y = 0; y < mapHeight;++y){
		for(var x = 0;x < mapWidth; ++x){
			if(maps[0][y][x] == 2){
				ctx.fillRect(xOffset + (x * tileSize) + (tileSize / 2) - pacSize / 2, yOffset + (y * tileSize) + (tileSize / 2) - pacSize / 2, pacSize, pacSize);
			}
			if(maps[0][y][x] == 3){
				ctx.moveTo(xOffset + (x * tileSize) + (tileSize / 4) + (tileSize / 2), yOffset + (y * tileSize) + (tileSize / 2));
			 	ctx.arc(xOffset + (x * tileSize) + (tileSize / 2), yOffset + (y * tileSize) + (tileSize / 2), tileSize / 4, Math.PI * 2, -Math.PI * 2)
			}
		}
	}

	ctx.fill();
	ctx.closePath();
	ctx.restore();
}

function renderMap() {
	// This section is for if renderMap() is called every frame, to make it rotate colors
	// by default though, renderMap() is only called once, and cached.
	// 
	// if(rUp)
	// 	r = r + frameData.delta / 30;
	// else
	// 	r = r - frameData.delta / 30;

	// if(gUp)
	// 	g = g + frameData.delta / 8;
	// else
	// 	g = g - frameData.delta / 8;

	// if(bUp)
	// 	b = b + frameData.delta / 11;
	// else
	// 	b = b - frameData.delta / 15;

	// if(r > 240) rUp = false;
	// if(g > 240) gUp = false;
	// if(b > 240) bUp = false;

	// if(r < 10) rUp = true;
	// if(g < 10) gUp = true;
	// if(b < 10) bUp = true;

	var xOffset = 0;
	var yOffset = 0;

	mapBoundsCtx.save();

	var nullGates = [];
	var falseWalls = [];

	mapBoundsCtx.strokeStyle = "rgb(" + (r | 0) + "," + (g | 0) + "," + (b | 0) + ")";
	mapBoundsCtx.fillStyle = "#22f";
	var lineWidth = tileSize / 12;
	mapBoundsCtx.lineWidth = lineWidth;
	mapBoundsCtx.beginPath();

	for(var y = 0; y < mapHeight;++y){
		for(var x = 0;x < mapWidth; ++x){
			neighbours = checkNeighbours(x, y);
			if(neighbours === undefined) continue;

			if(neighbours.length > 1){
				if(neighbours[0] === null){
					nullGates.push([x, y, neighbours[1]]);
					continue;
				}

				if(neighbours[0] === false){
					falseWalls.push([x, y, neighbours[1]]);
					continue;
				}
			}

			switch(neighbours[0].substr(0, 4)){
				case "1010": // top & bottom open
				case "0010": // bottom open
				case "1000": // top open
					mapBoundsCtx.moveTo(xOffset + (x * tileSize), yOffset + (y * tileSize) + (tileSize / 2));
					mapBoundsCtx.lineTo(xOffset + (x * tileSize) + tileSize, yOffset + (y * tileSize) + (tileSize / 2));
					break;
				case "0101": // left & right open
				case "0001": // left open
				case "0100": // right open
					mapBoundsCtx.moveTo(xOffset + (x * tileSize) + (tileSize / 2), yOffset + (y * tileSize));
					mapBoundsCtx.lineTo(xOffset + (x * tileSize) + (tileSize / 2), yOffset + (y * tileSize) + tileSize);
					break;
				case "1100": // top & right open
					// horizontal portion
					mapBoundsCtx.moveTo(xOffset + (x * tileSize), yOffset + (y * tileSize) + (tileSize / 2));
					mapBoundsCtx.lineTo(xOffset + (x * tileSize) + ((tileSize / 2) - (lineWidth / 2)), yOffset + (y * tileSize) + (tileSize / 2));
					// vertical portion
					mapBoundsCtx.moveTo(xOffset + (x * tileSize) + (tileSize / 2), yOffset + (y * tileSize) + ((tileSize / 2) + (lineWidth / 2)));
					mapBoundsCtx.lineTo(xOffset + (x * tileSize) + (tileSize / 2), yOffset + (y * tileSize) + tileSize);
					break;
				case "1001": // top & left open
					// horizontal portion
					mapBoundsCtx.moveTo(xOffset + (x * tileSize) + ((tileSize / 2) + (lineWidth / 2)), yOffset + (y * tileSize) + (tileSize / 2));
					mapBoundsCtx.lineTo(xOffset + (x * tileSize) + tileSize, yOffset + (y * tileSize) + (tileSize / 2));
					// vertical portion
					mapBoundsCtx.moveTo(xOffset + (x * tileSize) + (tileSize / 2), yOffset + (y * tileSize) + ((tileSize / 2) + (lineWidth / 2)));
					mapBoundsCtx.lineTo(xOffset + (x * tileSize) + (tileSize / 2), yOffset + (y * tileSize) + tileSize);
					break;
				case "0110": // bottom & right open
					// horizontal portion
					mapBoundsCtx.moveTo(xOffset + (x * tileSize), yOffset + (y * tileSize) + (tileSize / 2));
					mapBoundsCtx.lineTo(xOffset + (x * tileSize) + ((tileSize / 2) - (lineWidth / 2)), yOffset + (y * tileSize) + (tileSize / 2));
					// vertical portion
					mapBoundsCtx.moveTo(xOffset + (x * tileSize) + (tileSize / 2), yOffset + (y * tileSize));
					mapBoundsCtx.lineTo(xOffset + (x * tileSize) + (tileSize / 2), yOffset + (y * tileSize) + ((tileSize / 2) - (lineWidth / 2)));
					break;
				case "0011": // bottom & left open
					// horizontal portion
					mapBoundsCtx.moveTo(xOffset + (x * tileSize) + ((tileSize / 2) + (lineWidth / 2)), yOffset + (y * tileSize) + (tileSize / 2));
					mapBoundsCtx.lineTo(xOffset + (x * tileSize) + tileSize, yOffset + (y * tileSize) + (tileSize / 2));
					// vertical portion
					mapBoundsCtx.moveTo(xOffset + (x * tileSize) + (tileSize / 2), yOffset + (y * tileSize));
					mapBoundsCtx.lineTo(xOffset + (x * tileSize) + (tileSize / 2), yOffset + (y * tileSize) + ((tileSize / 2) - (lineWidth / 2)));
					break;
			}

			switch(neighbours[0]){
				case "00-1000-1-1": // bottom edge of map
				case "-1000-1-100": // top edge of map
					mapBoundsCtx.moveTo(xOffset + (x * tileSize), yOffset + (y * tileSize) + (tileSize / 2));
					mapBoundsCtx.lineTo(xOffset + (x * tileSize) + tileSize, yOffset + (y * tileSize) + (tileSize / 2));
					break;
				case "0-1000-1-10": // right edge of map
				case "000-1-100-1": // left edge of map
					mapBoundsCtx.moveTo(xOffset + (x * tileSize) + (tileSize / 2), yOffset + (y * tileSize));
					mapBoundsCtx.lineTo(xOffset + (x * tileSize) + (tileSize / 2), yOffset + (y * tileSize) + tileSize);
					break;
				case "-1001-1-101": // right teleport top edge of map
				case "-100-1-1-10-1": // top left edge of map
				case "100-1-110-1": // bottom teleport left edge of map
				case "00000010": // bottom right open
					// horizontal portion
					mapBoundsCtx.moveTo(xOffset + (x * tileSize) + ((tileSize / 2) + (lineWidth / 2)), yOffset + (y * tileSize) + (tileSize / 2));
					mapBoundsCtx.lineTo(xOffset + (x * tileSize) + tileSize, yOffset + (y * tileSize) + (tileSize / 2));
					// vertical portion
					mapBoundsCtx.moveTo(xOffset + (x * tileSize) + (tileSize / 2), yOffset + (y * tileSize) + ((tileSize / 2) + (lineWidth / 2)));
					mapBoundsCtx.lineTo(xOffset + (x * tileSize) + (tileSize / 2), yOffset + (y * tileSize) + tileSize);
					break;
				case "-1100-1-110": // left teleport top edge of map
				case "1-1001-1-10": // bottom teleport right edge of map
				case "-1-100-1-1-10": // top right edge of map
				case "00000001": // bottom left open
					// horizontal portion
					mapBoundsCtx.moveTo(xOffset + (x * tileSize), yOffset + (y * tileSize) + (tileSize / 2));
					mapBoundsCtx.lineTo(xOffset + (x * tileSize) + ((tileSize / 2) - (lineWidth / 2)), yOffset + (y * tileSize) + (tileSize / 2));
					// vertical portion
					mapBoundsCtx.moveTo(xOffset + (x * tileSize) + (tileSize / 2), yOffset + (y * tileSize) + ((tileSize / 2) + (lineWidth / 2)));
					mapBoundsCtx.lineTo(xOffset + (x * tileSize) + (tileSize / 2), yOffset + (y * tileSize) + tileSize);
					break;
				case "00-1110-1-1": // right teleport bottom edge of map
				case "00-1-1-10-1-1": // bottom left edge of map
				case "001-1-101-1": // top teleport left edge of map
				case "00000100": // top right open
					// horizontal portion
					mapBoundsCtx.moveTo(xOffset + (x * tileSize) + ((tileSize / 2) + (lineWidth / 2)), yOffset + (y * tileSize) + (tileSize / 2));
					mapBoundsCtx.lineTo(xOffset + (x * tileSize) + tileSize, yOffset + (y * tileSize) + (tileSize / 2));
					// vertical portion
					mapBoundsCtx.moveTo(xOffset + (x * tileSize) + (tileSize / 2), yOffset + (y * tileSize));
					mapBoundsCtx.lineTo(xOffset + (x * tileSize) + (tileSize / 2), yOffset + (y * tileSize) + ((tileSize / 2) - (lineWidth / 2)));
					break;
				case "01-1001-1-1": // left teleport bottom edge of map
				case "0-1100-1-11": // top teleport right edge of map
				case "0-1-100-1-1-1": // bottom right edge of map
				case "00001000": // top left open
					// horizontal portion
					mapBoundsCtx.moveTo(xOffset + (x * tileSize), yOffset + (y * tileSize) + (tileSize / 2));
					mapBoundsCtx.lineTo(xOffset + (x * tileSize) + ((tileSize / 2) - (lineWidth / 2)), yOffset + (y * tileSize) + (tileSize / 2));
					// vertical portion
					mapBoundsCtx.moveTo(xOffset + (x * tileSize) + (tileSize / 2), yOffset + (y * tileSize));
					mapBoundsCtx.lineTo(xOffset + (x * tileSize) + (tileSize / 2), yOffset + (y * tileSize) + ((tileSize / 2) - (lineWidth / 2)));
					break;
			}
		}
	}

	mapBoundsCtx.stroke();
	mapBoundsCtx.closePath();

	mapBoundsCtx.strokeStyle = "rgb(" + (r | 0) + "," + (g | 0) + "," + (b | 0) + ")";
	mapBoundsCtx.fillStyle = "#22f";
	var lineWidth = tileSize / 20;
	mapBoundsCtx.lineWidth = lineWidth;
	mapBoundsCtx.beginPath();

	falseWalls.forEach(function(wall){
		x = wall[0];
		y = wall[1];

		switch(wall[2].substr(0,4)){
			case "1010":
				mapBoundsCtx.moveTo(xOffset + (x * tileSize), yOffset + (y * tileSize) + (tileSize / 2) - lineWidth);
				mapBoundsCtx.lineTo(xOffset + (x * tileSize) + tileSize, yOffset + (y * tileSize) + (tileSize / 2) - lineWidth);

				mapBoundsCtx.moveTo(xOffset + (x * tileSize), yOffset + (y * tileSize) + (tileSize / 2) + lineWidth);
				mapBoundsCtx.lineTo(xOffset + (x * tileSize) + tileSize, yOffset + (y * tileSize) + (tileSize / 2) + lineWidth);
				break;
			case "0101":
				mapBoundsCtx.moveTo(xOffset + (x * tileSize) + (tileSize / 2) - lineWidth, yOffset + (y * tileSize));
				mapBoundsCtx.lineTo(xOffset + (x * tileSize) + (tileSize / 2) - lineWidth, yOffset + (y * tileSize) + tileSize);

				mapBoundsCtx.moveTo(xOffset + (x * tileSize) + (tileSize / 2) + lineWidth, yOffset + (y * tileSize));
				mapBoundsCtx.lineTo(xOffset + (x * tileSize) + (tileSize / 2) + lineWidth, yOffset + (y * tileSize) + tileSize);
				break;
			case "0110":
				// horizontal portion inner
				mapBoundsCtx.moveTo(xOffset + (x * tileSize), yOffset + (y * tileSize) + (tileSize / 2) - lineWidth);
				mapBoundsCtx.lineTo(xOffset + (x * tileSize) + ((tileSize / 2) - (lineWidth / 2)), yOffset + (y * tileSize) + (tileSize / 2) - lineWidth);
				// vertical portion inner
				mapBoundsCtx.moveTo(xOffset + (x * tileSize) + (tileSize / 2) - lineWidth, yOffset + (y * tileSize));
				mapBoundsCtx.lineTo(xOffset + (x * tileSize) + (tileSize / 2) - lineWidth, yOffset + (y * tileSize) + ((tileSize / 2) - (lineWidth / 2)));
				// horizontal portion outer
				mapBoundsCtx.moveTo(xOffset + (x * tileSize), yOffset + (y * tileSize) + (tileSize / 2) + lineWidth);
				mapBoundsCtx.lineTo(xOffset + (x * tileSize) + (tileSize / 2) + lineWidth + lineWidth / 2, yOffset + (y * tileSize) + (tileSize / 2) + lineWidth);
				// vertical portion outer
				mapBoundsCtx.moveTo(xOffset + (x * tileSize) + (tileSize / 2) + lineWidth, yOffset + (y * tileSize));
				mapBoundsCtx.lineTo(xOffset + (x * tileSize) + (tileSize / 2) + lineWidth, yOffset + (y * tileSize) + (tileSize / 2) + lineWidth + lineWidth / 2);
				break;
			case "1001":
				// horizontal portion inner
				mapBoundsCtx.moveTo(xOffset + (x * tileSize) + ((tileSize / 2) + (lineWidth / 2)), yOffset + (y * tileSize) + (tileSize / 2) + lineWidth);
				mapBoundsCtx.lineTo(xOffset + (x * tileSize) + tileSize, yOffset + (y * tileSize) + (tileSize / 2) + lineWidth);
				// vertical portion inner
				mapBoundsCtx.moveTo(xOffset + (x * tileSize) + (tileSize / 2) + lineWidth, yOffset + (y * tileSize) + (tileSize / 2) + lineWidth);
				mapBoundsCtx.lineTo(xOffset + (x * tileSize) + (tileSize / 2) + lineWidth, yOffset + (y * tileSize) + tileSize);
				// horizontal portion outer
				mapBoundsCtx.moveTo(xOffset + (x * tileSize) + (tileSize / 2) - lineWidth - (lineWidth / 2), yOffset + (y * tileSize) + (tileSize / 2) - lineWidth);
				mapBoundsCtx.lineTo(xOffset + (x * tileSize) + tileSize, yOffset + (y * tileSize) + (tileSize / 2) - lineWidth);
				// vertical portion outer
				mapBoundsCtx.moveTo(xOffset + (x * tileSize) + (tileSize / 2) - lineWidth, yOffset + (y * tileSize) + (tileSize / 2) - lineWidth - (lineWidth / 2));
				mapBoundsCtx.lineTo(xOffset + (x * tileSize) + (tileSize / 2) - lineWidth, yOffset + (y * tileSize) + tileSize);
				break;
			case "0011":
				// horizontal portion inner
				mapBoundsCtx.moveTo(xOffset + (x * tileSize) + ((tileSize / 2) + (lineWidth / 2)), yOffset + (y * tileSize) + (tileSize / 2) - lineWidth);
				mapBoundsCtx.lineTo(xOffset + (x * tileSize) + tileSize, yOffset + (y * tileSize) + (tileSize / 2) - lineWidth);
				// vertical portion inner
				mapBoundsCtx.moveTo(xOffset + (x * tileSize) + (tileSize / 2) + lineWidth, yOffset + (y * tileSize));
				mapBoundsCtx.lineTo(xOffset + (x * tileSize) + (tileSize / 2) + lineWidth, yOffset + (y * tileSize) + ((tileSize / 2) - (lineWidth / 2)));
				// horizontal portion outer
				mapBoundsCtx.moveTo(xOffset + (x * tileSize) + (tileSize / 2) - lineWidth - lineWidth / 2, yOffset + (y * tileSize) + (tileSize / 2) + lineWidth);
				mapBoundsCtx.lineTo(xOffset + (x * tileSize) + tileSize, yOffset + (y * tileSize) + (tileSize / 2) + lineWidth);
				// vertical portion outer
				mapBoundsCtx.moveTo(xOffset + (x * tileSize) + (tileSize / 2) - lineWidth, yOffset + (y * tileSize));
				mapBoundsCtx.lineTo(xOffset + (x * tileSize) + (tileSize / 2) - lineWidth, yOffset + (y * tileSize) + (tileSize / 2) + lineWidth + lineWidth / 2);
				break;
			case "1100":
				// horizontal portion inner
				mapBoundsCtx.moveTo(xOffset + (x * tileSize), yOffset + (y * tileSize) + (tileSize / 2) + lineWidth);
				mapBoundsCtx.lineTo(xOffset + (x * tileSize) + ((tileSize / 2) - (lineWidth / 2)), yOffset + (y * tileSize) + (tileSize / 2) + lineWidth);
				// vertical portion inner
				mapBoundsCtx.moveTo(xOffset + (x * tileSize) + (tileSize / 2) - lineWidth, yOffset + (y * tileSize) + ((tileSize / 2) + (lineWidth / 2)));
				mapBoundsCtx.lineTo(xOffset + (x * tileSize) + (tileSize / 2) - lineWidth, yOffset + (y * tileSize) + tileSize);
				// horizontal portion outer
				mapBoundsCtx.moveTo(xOffset + (x * tileSize), yOffset + (y * tileSize) + (tileSize / 2) - lineWidth);
				mapBoundsCtx.lineTo(xOffset + (x * tileSize) + (tileSize / 2) + lineWidth + lineWidth / 2, yOffset + (y * tileSize) + (tileSize / 2) - lineWidth);
				// vertical portion outer
				mapBoundsCtx.moveTo(xOffset + (x * tileSize) + (tileSize / 2) + lineWidth, yOffset + (y * tileSize) + (tileSize / 2) - lineWidth - lineWidth / 2);
				mapBoundsCtx.lineTo(xOffset + (x * tileSize) + (tileSize / 2) + lineWidth, yOffset + (y * tileSize) + tileSize);
				break;
		}
	})

	mapBoundsCtx.stroke();
	mapBoundsCtx.closePath();

	mapBoundsCtx.strokeStyle = "white";
	mapBoundsCtx.fillStyle = "#22f";
	var lineWidth = 1;
	mapBoundsCtx.lineWidth = lineWidth;
	mapBoundsCtx.beginPath();

	nullGates.forEach(function(gate){
		x = gate[0];
		y = gate[1];

		switch(gate[2].substr(0, 4)){
			case "1010":
				mapBoundsCtx.moveTo(xOffset + (x * tileSize), yOffset + (y * tileSize) + (tileSize / 2));
				mapBoundsCtx.lineTo(xOffset + (x * tileSize) + tileSize, yOffset + (y * tileSize) + (tileSize / 2));
				break;
			case "0101":
				mapBoundsCtx.moveTo(xOffset + (x * tileSize) + (tileSize / 2), yOffset + (y * tileSize));
				mapBoundsCtx.lineTo(xOffset + (x * tileSize) + (tileSize / 2), yOffset + (y * tileSize) + tileSize);
				break;
		}
		
	})

	mapBoundsCtx.stroke();
	mapBoundsCtx.closePath();

	mapBoundsCtx.restore();
}

function checkNeighbours(x, y){
	if(maps[0][y][x]) return undefined;

	var neighbourString = "";
	[[0, -1], [1, 0], [0, 1], [-1, 0], [-1, -1], [1, -1], [1, 1], [-1, 1]].forEach(function(neighbour){
		if(maps[0][y + neighbour[1]] !== undefined){
			if(maps[0][y + neighbour[1]][x + neighbour[0]] !== undefined){
				if(maps[0][y + neighbour[1]][x + neighbour[0]]){
					neighbourString += "1";
				} else {
					neighbourString += "0";
				}
			} else {
				neighbourString += "-1";
			}
		} else {
			neighbourString += "-1";
		}
	});

	if(maps[0][y][x] === null)
		return [null, neighbourString];
	if(maps[0][y][x] === false)
		return [false, neighbourString];

	return [neighbourString];
}