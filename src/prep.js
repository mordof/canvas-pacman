var screenWidth = window.innerWidth;
var screenHeight = window.innerHeight;

// initial map dimensions and such;
var mapWidth = 30;
var mapHeight = 33;

var tileSize = ((screenWidth / mapWidth) < (screenHeight / mapHeight) ? 
        (screenWidth / mapWidth) | 0 : (screenHeight / mapHeight) | 0);

tileSize = tileSize * 0.80

var tileMod = tileSize / 23

var xOffset = (((screenWidth / 2) - ((tileSize * mapWidth) / 2)) | 0) + 0.5;
var yOffset = (((screenHeight / 2) - ((tileSize * mapHeight) / 2)) | 0) + 0.5;

var sprites = [];
var allowMovement = true;

var showDebug = false;

var ghostCollision = true;

var mapBoundaries = document.createElement('canvas')
mapBoundaries.width = mapWidth * tileSize;
mapBoundaries.height = mapHeight * tileSize;

var mapBoundsCtx = mapBoundaries.getContext('2d')
mapBoundsCtx.width = (mapWidth * tileSize) | 0;
mapBoundsCtx.height = (mapHeight * tileSize) | 0;