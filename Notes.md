## Questions/Concerns
---

- is `queuedMovement` also used as a debouncer for actions/direction changes between tiles?
  - looks that way. changed in favor of `queuedDirection` in `ControllableBase`
  - leaving in case new info comes to light.
- `const destXPos = this.xTilePos * tileSize;` What is `tileSize` doing here? why is this a thing?
- After a teleport, do we want to use `this.queuedDirection`?

## Modifications being made
---

- `sprite.moving` being removed in favor of "locking" mechanisms for states needed:
  - pacman just started, can't move
  - pacman is dieing/respawning.
  - ghost is dead and in pen
- Controller Object to handle all input/movement passed to controllable sprites
  - Applies to both player controlled, and AI controlled.
- `leftState && rightState && upState && downState && queuedMovement` move into a Controller obj
  - controller obj supplied to controllable sprite when initialized (mandatory to provide one)
  - `queuedMovement` could use a rename
    - currently understood as 'keys have been pressed - not yet acted upon'

    - **Changes Made:**
      - ControllableBase using `queuedDirection` to mark when direction requests have been given.
        this gets evaluated on each move - deciding if it should be cleared, or action taken.
- simplify move tracking/facing/direction just with 'left/right/up/down'
- `gridUpdated` AI handler moved out to independant AI controller.
  - implemented using `controllable.registerAfterMoveHook` in extends InputHandler
  - is now `./input-handlers/ai/ghost.ts`
  - can also be `./input-handlers/ai/pacman.ts` for a pacman AI controller.
- map tile values should be more meaningful. e.g. `0 === 'impassable'` is too obscure.
- moving Collision Handling out of pacmanSprite.
  - now in `CollisionHandler.ts`

## Global Variables and functions (and their locations)
---

### [renderMap.js]
**`r, g, b`** - stroke color of map
**`pacSize`**
**`renderPacs()`**
**`renderMap()`**
**`checkNeighbours(x, y)`** - used to identify the surroundings of each tile, for rendering map purposes

### [map.js]
**`maps[mapIndex][y][x] = tileState`** - stores map data. TileState (needs organizing):
  - 0: impassable
  - 1: passable, empty
  - 2: passable, contains small pac
  - 3: passable, contains big pac
  - 8: ghost passable, empty
  - '9[char]-[dir]': teleport pad. [char] links them. [dir] states departing direction
  - false: impassable, ghost home wall.
  - null: ghost passable, entrance to ghost home.

**`wayPoints { [wpIndex]: [x, y, [[wpIndex, direction]...] ]}`** - stores all waypoints, and what waypoints they're connected to.
**`wayPointLookup [mapIndex][y][x] = wpIndex`** - a lookup for waypoints based on location.
**`teleportPads { ['9[char']: { x, y, direction: [dir] }[] }`** - contains all the teleport pads in the map, their locations, and direction to face upon exiting.
**`buildWaypoints(mapIndex)`** - populates wayPoints and wayPointLookup based on mapIndex
**`filterWaypointsByDirection(waypoints, direction) => waypoints`** - ghost AI uses this for roaming: trims out waypoints that are doubling back on itself.
**`isTeleportPad(tileState)`** - returns true if tileState is a teleport pad.
**`collectTeleportPads() => teleportPads`** - populates `teleportPads`
**`getTeleportPadDestination(x, y) => { x, y, direction }`** - the other teleport pad connected to the x, y provided
**`collectWaypointNeighbours(waypoint) => [wpIndex, direction][]`** - used by buildWaypoints() to find a list of all waypoints connecting to the specified waypoint.
**`getWaypointsToDest(mapIndex, startWpIndex, destWpIndex) => wpIndex[]`** - returns waypoint ids for the shortest path between two waypoints.
**`areJunctionsConnected(mapIndex, wpIndex1, wpIndex2) => fase | direction`** - looks to be used for AI to carry out waypoint list instructions? AI, when they have a destination, have an array of waypoints that'll take them tehre. this looks to tell them which way they need to go to fulfill that. NOTES: poorly named, and needs refactoring (shouldn't return false?)
**`initialMapCheck()`** - console logs details of `checkNeighbours` found in `renderMap.js`

### [init.js]
**`screenWidth`** - page width in px
**`screenHeight`** - page height in px
**`mapWidth`** - # of tiles width. NOTE: this should simply count the map details.
**`mapHeight`** - # of tiles height. NOTE: same, should count the map details.
**`tileSize`** - for auto-scaling. finds a good width/height ratio. not needed for panel. Gets lessend by 80% because... magic numbers?
**`tileMod`** - used solely in some draw commands. what the heck is this value!?!? / 23.. magic number!? 
**`xOffset`** - centers playing area horizontally by providing an X start value in correct location
**`yOffset`** - centers playing area vertically by providing a Y start value in correct location
**`sprites`** - array of active sprites in the game (ghost, pacman, fruits)
**`showDebug`** - (bool) enable waypoint overlay drawing, and UI boxes for info on AI/movement
**`ghostCollision`** - (bool) toggle ghosts ability to collide/cause pacman death (also disables big pac)
**`frameData{ start: ts, end: ts, delta: ms, frame: int, fps: int, fpsLastCalced: int}`** - frame handling + delta. core details needed for most aspects of the game.

**`runPacman()`** - initializes ghosts/pacman/map/fruits, populates sprites, pre-renders map, starts game loop
**`frameStep()`** - game loop function (populates `frameData`, calls `draw()` in draw.js)

###### these two don't need to be in init at all. they're for rendering the map only into a cache.
**`mapBoundaries`** - in-memory canvas for rendering/caching the map
**`mapBoundsCtx`** - in-memory canvas context to render map to.

### [draw.js]
**`draw()`** - calls all draw methods for everything during game run.
**`drawWaypoints()`** - used during debug to draw the waypoint overlay for available movements
**`drawFruit()`** - draws the fruit options (should be what you've acquired, not total) in lower right.
**`drawLives()`** - draws pacman lives in bottom left
**`drawScore()`** - draws score in top right
**`pad(n, width, z)`** - used in drawing score to left pad with appropriate # of 0's (pretty sure this can be replaced by a native call)
**`drawDebugInfo()`** - fills in the UI debugInfo panel with details (only called if `showDebug === true`)