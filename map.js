

var maps = [];
var wayPoints = {};
var wayPointLookup = [];

wayPointLookup[0] = [];
maps[0] = []

for(var y = 0;y<mapHeight;++y){
	maps[0][y] = []
	for(var x = 0;x < mapWidth; ++x){
		maps[0][y][x] = 1;
	}
}

n = null
f = false

maps[0] = [
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,2,2,2,2,2,2,2,2,2,2,2,2,0,0,2,2,2,2,2,2,2,2,2,2,2,2,0,0],
	[0,0,2,0,0,0,0,2,0,0,0,0,0,2,0,0,2,0,0,0,0,0,2,0,0,0,0,2,0,0],
	[0,0,3,0,0,0,0,2,0,0,0,0,0,2,0,0,2,0,0,0,0,0,2,0,0,0,0,3,0,0],
	[0,0,2,0,0,0,0,2,0,0,0,0,0,2,0,0,2,0,0,0,0,0,2,0,0,0,0,2,0,0],
	[0,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,0],
	[0,0,2,0,0,0,0,2,0,0,2,0,0,0,0,0,0,0,0,2,0,0,2,0,0,0,0,2,0,0],
	[0,0,2,0,0,0,0,2,0,0,2,0,0,0,0,0,0,0,0,2,0,0,2,0,0,0,0,2,0,0],
	[0,0,2,2,2,2,2,2,0,0,2,2,2,2,0,0,2,2,2,2,0,0,2,2,2,2,2,2,0,0],
	[0,0,0,0,0,0,0,2,0,0,0,0,0,1,0,0,1,0,0,0,0,0,2,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,2,0,0,0,0,0,1,0,0,1,0,0,0,0,0,2,0,0,0,0,0,0,0],
	[0,0,8,8,8,0,0,2,0,0,1,1,1,1,1,1,1,1,1,1,0,0,2,0,0,8,8,8,0,0],
	[0,0,0,0,0,0,0,2,0,0,1,f,f,f,n,n,f,f,f,1,0,0,2,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,2,0,0,1,f,8,8,8,8,8,8,f,1,0,0,2,0,0,0,0,0,0,0],
	[9,1,1,1,1,1,1,2,1,1,1,f,8,8,8,8,8,8,f,1,1,1,2,1,1,1,1,1,1,9],
	[0,0,0,0,0,0,0,2,0,0,1,f,8,8,8,8,8,8,f,1,0,0,2,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,2,0,0,1,f,f,f,f,f,f,f,f,1,0,0,2,0,0,0,0,0,0,0],
	[0,0,8,8,8,0,0,2,0,0,1,1,1,1,1,1,1,1,1,1,0,0,2,0,0,8,8,8,0,0],
	[0,0,0,0,0,0,0,2,0,0,1,0,0,0,0,0,0,0,0,1,0,0,2,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,2,0,0,1,0,0,0,0,0,0,0,0,1,0,0,2,0,0,0,0,0,0,0],
	[0,0,2,2,2,2,2,2,2,2,2,2,2,2,0,0,2,2,2,2,2,2,2,2,2,2,2,2,0,0],
	[0,0,2,0,0,0,0,2,0,0,0,0,0,2,0,0,2,0,0,0,0,0,2,0,0,0,0,2,0,0],
	[0,0,2,0,0,0,0,2,0,0,0,0,0,2,0,0,2,0,0,0,0,0,2,0,0,0,0,2,0,0],
	[0,0,3,2,2,0,0,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,0,0,2,2,3,0,0],
	[0,0,0,0,2,0,0,2,0,0,2,0,0,0,0,0,0,0,0,2,0,0,2,0,0,2,0,0,0,0],
	[0,0,0,0,2,0,0,2,0,0,2,0,0,0,0,0,0,0,0,2,0,0,2,0,0,2,0,0,0,0],
	[0,0,2,2,2,2,2,2,0,0,2,2,2,2,0,0,2,2,2,2,0,0,2,2,2,2,2,2,0,0],
	[0,0,2,0,0,0,0,0,0,0,0,0,0,2,0,0,2,0,0,0,0,0,0,0,0,0,0,2,0,0],
	[0,0,2,0,0,0,0,0,0,0,0,0,0,2,0,0,2,0,0,0,0,0,0,0,0,0,0,2,0,0],
	[0,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
]

// this can be moved once we have a proper maps loader
buildWaypoints(0);

function buildWaypoints(mapNumber) {
	var mapWidth = maps[mapNumber][0].length;
	var mapHeight = maps[mapNumber].length;
	var jCount = 0;

	//pass 1 - populate all junctions on map as possible 'waypoints'
	for (var y = 0; y < mapHeight; y++) {
		wayPointLookup[mapNumber][y] = [];
		for (var x = 0; x < mapWidth; x++) {
			wayPointLookup[mapNumber][y][x] = false;

			if(maps[mapNumber][y][x] == 1 || maps[mapNumber][y][x] == 2 || maps[mapNumber][y][x] == 3 || maps[mapNumber][y][x] == 9){
				wayPoints[jCount] = [x, y,[]];
				wayPointLookup[mapNumber][y][x] = jCount;
				jCount++;
			}
		}
	}

	console.log('Pass 1 complete...');
	//pass 2 - build networks between accesible wayPoints;
	for (wayPoint in wayPoints) { if(!wayPoints.hasOwnProperty(wayPoint)) continue;
		wayPoints[wayPoint][2].push.apply(wayPoints[wayPoint][2], collectWaypointNeighbours(wayPoints[wayPoint]));

		// //returns false if not connected, otherwise returns direction to child;
		// xDirection = areJunctionsConnected(mapNumber,parentID,childID);

		// if (xDirection) wayPoints[parentID][2].push([childID,xDirection]);

	}
	console.log('Pass 2 complete...');
	console.log(wayPoints);

}

function collectWaypointNeighbours(waypoint){
	x = waypoint[0]
	y = waypoint[1]

	nearestGrids = [[-1, 0, "leftState"], [0, -1, "upState"], [1, 0, "rightState"], [0, 1, "downState"]];
	neighbours = []

	nearestGrids.forEach(function(grid){
		tile = maps[0][y + grid[1]][x + grid[0]]

		if(tile == 1 || tile == 2 || tile == 3){
			neighbours.push([wayPointLookup[0][y + grid[1]][x + grid[0]], grid[2]]);
		}
	})

	// teleportation pad.. we need to make the pairing pad it's child also.
	if(maps[0][y][x] == 9){
		// we're on the right hand side of the map.
		// for now, we're assuming that the very left hand on the same y is the destination.
		if(x + 1 == mapWidth){
			wayPoints[wayPointLookup[0][y][x - 1]][2].push([wayPointLookup[0][y][0], "rightState"]);
		}
		// heading to left edge of the map
		if(x - 1 < 0){
			wayPoints[wayPointLookup[0][y][1]][2].push([wayPointLookup[0][y][mapWidth - 1], "leftState"]);
		}
		// bottom of the map
		if(y + 1 == mapHeight){
			wayPoints[wayPointLookup[0][y - 1][x]][2].push([wayPointLookup[0][0][x], "upState"]);
		}
		// top of the map
		if(y - 1 < 0){
			wayPoints[wayPointLookup[0][y + 1][x]][2].push([wayPointLookup[0][mapHeight - 1][x], "downState"]);
		}
	}

	return neighbours;
}

function getWaypointsToDest(mapNumber, startWaypointID, destWaypointID) {
	var tempChain = [];
	var xDirection;

	// takes a current waypoint, returns a list of waypoints to destination;
	if (startWaypointID == destWaypointID) return false;

	// for each child of currWaypoint, explore all children waypoints until you end up
	// at the destination;  track count of children needed, return least expensive path
	for (var i = 0; i < wayPoints[startWaypointID][2].length; i++) {
		if (wayPoints[startWaypointID][2][i][0] == destWaypointID) {
			tempChain.push([wayPoints[startWaypointID][2][i][0],wayPoints[startWaypointID][2][i][1]]);
			return tempChain;
		}
	}

	// keep record of the waypoints we've checked, so as to not double check them.
	var checkedIDs = [];
	// this holds all of our different paths and their routes
	var checkedPaths = [[startWaypointID]];
	// iterator for checkedPaths
	var i = 0;
	// if we've found something
	var destinationFound = false;
	// the children we're looking at for the current checkPath item
	var currChildren;
	// flag for determining more than one child for a given path (requires a path duplication)
	var firstChild = true;

	do {
		// reset variables
		firstChild = true;

		// grab the children belonging to the last waypoint in this particular path
		currChildren = wayPoints[checkedPaths[i][checkedPaths[i].length - 1]][2].slice(0)

		// loop through those children
		for(var c = 0; c < currChildren.length; ++c){
			// if we've already checked this waypoint somewhere else in the process, don't work with it now
			if(checkedIDs.indexOf(currChildren[c][0]) !== -1) continue;

			if(firstChild){
				// if it's the first child of this waypoint, we don't need to create a new path - just append it to the current path
				checkedPaths[i].push(currChildren[c][0]);
			} else {
				// create a new path for each additional child of this waypoint, by using unshift (places entry at the start)
				// Array.apply([], arrayvar) will duplicate the array without passing the reference so we can have a new path
				checkedPaths.unshift(Array.apply([],checkedPaths[i]))
				// we added the first child onto this path.. but we don't want it included in the other children.
				// remove it using pop to take the last item off.
				checkedPaths[0].pop();
				// place the current child onto the end of it's own newly created path
				checkedPaths[0].push(currChildren[c][0]);
				// ensure that the index tracker is at the right path by bumping it up one (the original path we were on)
				i++;
			}

			// if we found the destination point
			if(currChildren[c][0] == destWaypointID)
			{
				// if it's not the first child - that means we did an unshift and put the path at the very beginning
				// specify the index as the beginning of the array
				if(!firstChild){
					i = 0;
				}
				// flag we found the entry
				destinationFound = true;
				break;
			} else {
				// we didn't find the waypoint we were looking for yet. Add the child we're currently examining
				// to the list of IDs we've already checked. At the top of the for loop, we make sure not to check duplicates
				checkedIDs.push(currChildren[c][0]);
			}

			// flag firstChild as false - if we made it here, it means we're moving on to either a second child, or another waypoint list.
			// in either case, prevent first child logic from applying again for this children list.
			firstChild = false;
		}

		// we've found our destination - break out of the loop to preserve our indx
		if(destinationFound)
			break;

		// check the next path
		i++;

		// if we've hit the end of the paths, go back and start over.
		// We'll have more paths/waypoints added by this time to go back over and do new checks.
		if(i == checkedPaths.length)
			i = 0;
	} while(!destinationFound)

	// return the path to the destination
	return checkedPaths[i];
}

// *****************
// *****************
// *** KEEP THIS ***
// *****************
// *****************
//
// function isJunction(mapNumber,x,y) {
// 	var posHor = false, posVert = false;
// 	var hOffset = 0, vOffset = 0;

// 	for (var i = 0; i < 4; i++) {
// 		if (posVert) posHor = !posHor;
// 		posVert = !posVert;
		
// 		//states finalized, create offsets;
// 		//offsets get us to the corner
// 		hOffset = (posHor ? 1 : -1);
// 		vOffset = (posVert ? 1 : -1);
// 		if ((!maps[mapNumber][y+vOffset][x+hOffset]) &&
// 		    (maps[mapNumber][y][x+hOffset]) && 
// 		    (maps[mapNumber][y+vOffset][x])) {
// 			return true;
// 		} else {
// 			//return 'false';
// 		}
// 	}
// 	return false;
// }

function areJunctionsConnected(mapNumber,junc1,junc2) {
	var xMovement = 0; yMovement = 0;
	var xPoint = wayPoints[junc1][0];
	var yPoint = wayPoints[junc1][1];
	var xDirection;
	// are two junctions in the current 'wayPoints' array in direct LOS of each other?
	
	// waypoints should never join themselves
	if (junc1 == junc2) return false;

	// if both X and Y are different, then no need to do expensive wall test
	if ((wayPoints[junc1][0] != wayPoints[junc2][0]) && (wayPoints[junc1][1] != wayPoints[junc2][1])) return false;

	// if we got this far, then if the x is the same, we'll go vertical
	if (wayPoints[junc1][0] == wayPoints[junc2][0]) {
		yMovement = (wayPoints[junc1][1] > wayPoints[junc2][1] ? -1 : 1);
	} else { // y values match - horizontal check needed, left or right?
		xMovement = (wayPoints[junc1][0] > wayPoints[junc2][0] ? -1 : 1);
	}

	do {
		xPoint = xPoint + xMovement;
		yPoint = yPoint + yMovement;
		if (!maps[mapNumber][yPoint][xPoint]) return false;
	} while ((xPoint != wayPoints[junc2][0]) || (yPoint != wayPoints[junc2][1]))

	//return relative direction
	if (xMovement == 1) {
		return 'rightState';
	} else if (xMovement == -1) {
		return 'leftState';
	} else if (yMovement == 1) {
		return 'downState';
	} else if (yMovement == -1) {
		return 'upState';
	}

}

function initialMapCheck(){
	for(var y = 0; y < mapHeight;++y){
		for(var x = 0;x < mapWidth; ++x){
			console.group("x: " + x + "  y: " + y)
			console.log(checkNeighbours(x, y))
			console.groupEnd();
		}
	}
}