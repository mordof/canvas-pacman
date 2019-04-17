import { 
  Direction,
} from './input-handlers/input-handler-base';

import { findOppositeDirection } from './lib/direction';

export { Direction };
export type X = number;
export type Y = number;
type WaypointIndex = number;

export class WaypointConnection {
  constructor(public index: WaypointIndex, public direction: Direction) {}
}

class Waypoint {
  constructor(public x: X, public y: Y, public connections: WaypointConnection[]) {}

  addConnections(connections: WaypointConnection[]) {
    this.connections.push.apply(this.connections, connections);
  }
}

class TeleportPad {
  constructor(public x: X, public y: Y, public direction: Direction) {}
}

export enum MapType {
  Original = 'original',
  FourManGhost = 'fourman',
}

enum TileType {
  Impassable,
  Passable,
  SmallPac,
  BigPac,
  GhostSpawnDoor,
  GhostSpawnWall,
  TeleportPad,
}

interface MapTile {
  tile: TileType;
  pad?: TeleportPad;
}
type MapData = MapTile[][];

interface Maps {
  [MapType.Original]: MapData;
  [MapType.FourManGhost]: MapData;
}

const i = TileType.Impassable;
const p = TileType.Passable;
const s = TileType.SmallPac;
const b = TileType.BigPac;
const d = TileType.GhostSpawnDoor;
const g = TileType.GhostSpawnWall;

const t = (tile: TileType) => {
  return {
    tile,
  };
}

const tp = (x: X, y: Y, dir: Direction) => {
  return {
    tile: TileType.TeleportPad,
    pad: new TeleportPad(x, y, dir),
  };
}

const maps: Maps = {
  [MapType.Original]: [
    [t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(i)],
    [t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(i)],
    [t(i),t(i),t(s),t(s),t(s),t(s),t(s),t(s),t(s),t(s),t(s),t(s),t(s),t(s),t(i),t(i),t(s),t(s),t(s),t(s),t(s),t(s),t(s),t(s),t(s),t(s),t(s),t(s),t(i),t(i)],
    [t(i),t(i),t(s),t(i),t(i),t(i),t(i),t(s),t(i),t(i),t(i),t(i),t(i),t(s),t(i),t(i),t(s),t(i),t(i),t(i),t(i),t(i),t(s),t(i),t(i),t(i),t(i),t(s),t(i),t(i)],
    [t(i),t(i),t(b),t(i),t(i),t(i),t(i),t(s),t(i),t(i),t(i),t(i),t(i),t(s),t(i),t(i),t(s),t(i),t(i),t(i),t(i),t(i),t(s),t(i),t(i),t(i),t(i),t(b),t(i),t(i)],
    [t(i),t(i),t(s),t(i),t(i),t(i),t(i),t(s),t(i),t(i),t(i),t(i),t(i),t(s),t(i),t(i),t(s),t(i),t(i),t(i),t(i),t(i),t(s),t(i),t(i),t(i),t(i),t(s),t(i),t(i)],
    [t(i),t(i),t(s),t(s),t(s),t(s),t(s),t(s),t(s),t(s),t(s),t(s),t(s),t(s),t(s),t(s),t(s),t(s),t(s),t(s),t(s),t(s),t(s),t(s),t(s),t(s),t(s),t(s),t(i),t(i)],
    [t(i),t(i),t(s),t(i),t(i),t(i),t(i),t(s),t(i),t(i),t(s),t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(s),t(i),t(i),t(s),t(i),t(i),t(i),t(i),t(s),t(i),t(i)],
    [t(i),t(i),t(s),t(i),t(i),t(i),t(i),t(s),t(i),t(i),t(s),t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(s),t(i),t(i),t(s),t(i),t(i),t(i),t(i),t(s),t(i),t(i)],
    [t(i),t(i),t(s),t(s),t(s),t(s),t(s),t(s),t(i),t(i),t(s),t(s),t(s),t(s),t(i),t(i),t(s),t(s),t(s),t(s),t(i),t(i),t(s),t(s),t(s),t(s),t(s),t(s),t(i),t(i)],
    [t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(s),t(i),t(i),t(i),t(i),t(i),t(p),t(i),t(i),t(p),t(i),t(i),t(i),t(i),t(i),t(s),t(i),t(i),t(i),t(i),t(i),t(i),t(i)],
    [t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(s),t(i),t(i),t(i),t(i),t(i),t(p),t(i),t(i),t(p),t(i),t(i),t(i),t(i),t(i),t(s),t(i),t(i),t(i),t(i),t(i),t(i),t(i)],
    [t(p),t(p),t(p),t(p),t(p),t(i),t(i),t(s),t(i),t(i),t(p),t(p),t(p),t(p),t(p),t(p),t(p),t(p),t(p),t(p),t(i),t(i),t(s),t(i),t(i),t(p),t(p),t(p),t(p),t(p)],
    [t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(s),t(i),t(i),t(p),t(g),t(g),t(g),t(d),t(d),t(g),t(g),t(g),t(p),t(i),t(i),t(s),t(i),t(i),t(i),t(i),t(i),t(i),t(i)],
    [t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(s),t(i),t(i),t(p),t(g),t(p),t(p),t(p),t(p),t(p),t(p),t(g),t(p),t(i),t(i),t(s),t(i),t(i),t(i),t(i),t(i),t(i),t(i)],
    [tp(29, 15, 'left'),t(p),t(p),t(p),t(p),t(p),t(p),t(s),t(p),t(p),t(p),t(g),t(p),t(p),t(p),t(p),t(p),t(p),t(g),t(p),t(p),t(p),t(s),t(p),t(p),t(p),t(p),t(p),t(p),tp(0, 15, 'right')],
    [t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(s),t(i),t(i),t(p),t(g),t(p),t(p),t(p),t(p),t(p),t(p),t(g),t(p),t(i),t(i),t(s),t(i),t(i),t(i),t(i),t(i),t(i),t(i)],
    [t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(s),t(i),t(i),t(p),t(g),t(g),t(g),t(g),t(g),t(g),t(g),t(g),t(p),t(i),t(i),t(s),t(i),t(i),t(i),t(i),t(i),t(i),t(i)],
    [t(p),t(p),t(p),t(p),t(p),t(i),t(i),t(s),t(i),t(i),t(p),t(p),t(p),t(p),t(p),t(p),t(p),t(p),t(p),t(p),t(i),t(i),t(s),t(i),t(i),t(p),t(p),t(p),t(p),t(p)],
    [t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(s),t(i),t(i),t(p),t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(p),t(i),t(i),t(s),t(i),t(i),t(i),t(i),t(i),t(i),t(i)],
    [t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(s),t(i),t(i),t(p),t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(p),t(i),t(i),t(s),t(i),t(i),t(i),t(i),t(i),t(i),t(i)],
    [t(i),t(i),t(s),t(s),t(s),t(s),t(s),t(s),t(s),t(s),t(s),t(s),t(s),t(s),t(i),t(i),t(s),t(s),t(s),t(s),t(s),t(s),t(s),t(s),t(s),t(s),t(s),t(s),t(i),t(i)],
    [t(i),t(i),t(s),t(i),t(i),t(i),t(i),t(s),t(i),t(i),t(i),t(i),t(i),t(s),t(i),t(i),t(s),t(i),t(i),t(i),t(i),t(i),t(s),t(i),t(i),t(i),t(i),t(s),t(i),t(i)],
    [t(i),t(i),t(s),t(i),t(i),t(i),t(i),t(s),t(i),t(i),t(i),t(i),t(i),t(s),t(i),t(i),t(s),t(i),t(i),t(i),t(i),t(i),t(s),t(i),t(i),t(i),t(i),t(s),t(i),t(i)],
    [t(i),t(i),t(b),t(s),t(s),t(i),t(i),t(s),t(s),t(s),t(s),t(s),t(s),t(s),t(p),t(p),t(s),t(s),t(s),t(s),t(s),t(s),t(s),t(i),t(i),t(s),t(s),t(b),t(i),t(i)],
    [t(i),t(i),t(i),t(i),t(s),t(i),t(i),t(s),t(i),t(i),t(s),t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(s),t(i),t(i),t(s),t(i),t(i),t(s),t(i),t(i),t(i),t(i)],
    [t(i),t(i),t(i),t(i),t(s),t(i),t(i),t(s),t(i),t(i),t(s),t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(s),t(i),t(i),t(s),t(i),t(i),t(s),t(i),t(i),t(i),t(i)],
    [t(i),t(i),t(s),t(s),t(s),t(s),t(s),t(s),t(i),t(i),t(s),t(s),t(s),t(s),t(i),t(i),t(s),t(s),t(s),t(s),t(i),t(i),t(s),t(s),t(s),t(s),t(s),t(s),t(i),t(i)],
    [t(i),t(i),t(s),t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(s),t(i),t(i),t(s),t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(s),t(i),t(i)],
    [t(i),t(i),t(s),t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(s),t(i),t(i),t(s),t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(s),t(i),t(i)],
    [t(i),t(i),t(s),t(s),t(s),t(s),t(s),t(s),t(s),t(s),t(s),t(s),t(s),t(s),t(s),t(s),t(s),t(s),t(s),t(s),t(s),t(s),t(s),t(s),t(s),t(s),t(s),t(s),t(i),t(i)],
    [t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(i)],
    [t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(i),t(i)],
  ],
  [MapType.FourManGhost]: [],
}

export const filterWaypointsByDirection = (connections: WaypointConnection[], direction: Direction) => {
  const oppositeDirection = findOppositeDirection(direction);
  return connections.filter((connection) => connection.direction !== oppositeDirection);
}

type Box = { top: number; right: number; bottom: number; left: number; };

class Map {
  private currentMap: MapType;
  private mapData: MapData;

  wayPointIndex: TileType[][];
                      // key === WaypointIndex
  wayPoints: { [key: number]: Waypoint };

  public canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  private wallColor = "rgb(150,0,255)";

  private width: number;
  private height: number;

  private padding: Box = { top: 0, right: 0, bottom: 0, left: 0 };
  public margin: Box = { top: 0, right: 0, bottom: 0, left: 0 };

  public tileSize: number;
  public tileMod: number; // used for drawing. magic number. could use some cleaning up
  
  loadMap = (mapType: MapType, width: number, height: number) => {
    this.wayPointIndex = [];
    this.wayPoints = {};

    this.currentMap = mapType;
    this.mapData = maps[this.currentMap];
    this.width = width;
    this.height = height;
    this.tileSize = this.calculateTileSize(width, height);
    this.tileMod = this.tileSize / 23; // `23` is from the original pacman. I have no idea how I came to use that number, or why.

    this.canvas = document.createElement('canvas');
    this.canvas.width = width;
    this.canvas.height = height;
    this.ctx = this.canvas.getContext('2d');

    this.buildWaypoints();
    this.renderMap();
    this.renderPacs();
  }

  isTileTraversable = (tile: TileType, type: 'ghost' | 'pacman' = 'pacman') => {
    let passable: boolean = tile === TileType.Passable
      || tile === TileType.SmallPac
      || tile === TileType.BigPac
      || tile === TileType.TeleportPad;


    if (type === 'ghost') {
      passable = passable || tile === TileType.GhostSpawnDoor;
    }

    return passable;
  }

  isTraversable = (x: number, y: number, type: 'ghost' | 'pacman' = 'pacman') => {
    if (!this.mapData[y] || !this.mapData[y][x]) return false;

    const tile = this.mapData[y][x].tile;
    return this.isTileTraversable(tile, type);
  }

  getTeleportPad(x: number, y: number) {
    return this.mapData[y][x].pad;
  }

  isTeleportPad(x: number, y: number) {
    if (!this.mapData[y] || !this.mapData[y][x]) return false;
    return this.mapData[y][x].tile === TileType.TeleportPad;
  }

  isSmallPac(x: number, y: number) {
    if (!this.mapData[y] || !this.mapData[y][x]) return false;
    return this.mapData[y][x].tile === TileType.SmallPac;
  }

  isBigPac(x: number, y: number) {
    if (!this.mapData[y] || !this.mapData[y][x]) return false;
    return this.mapData[y][x].tile === TileType.BigPac;
  }

  erasePac(x: number, y: number) {
    // clear the pac from the cached map render
    this.renderPac(x, y, false);
    // update the map date.
    this.mapData[y][x].tile = TileType.Passable;
  }

  getWaypointsToDest(startIndex: WaypointIndex, destinationIndex: WaypointIndex): WaypointConnection[] {
    // if the start and end waypoint are the same, then we're already at our destination
    if (startIndex === destinationIndex) return [];
  
    // check immediate neighbours to see if they are our destination.
    // ... note added later: pretty sure i made this with pre-optimization performance in mind.
    for (const connection of Object.values(this.wayPoints[startIndex].connections)) {
      if (connection.index === destinationIndex) {
        return [connection];
      }
    }
  
    // keep record of the waypoints we've checked, so as to not double check them.
    const encounteredIndices: WaypointIndex[] = [];
    // this holds all of our different paths and their routes
    const possiblePaths: WaypointConnection[][] = [
      this.wayPoints[startIndex].connections.map((connection) => {
        return new WaypointConnection(connection.index, connection.direction);
      }),
    ];

    let i = 0;
  
    while (true) {
      const currentPath = possiblePaths[i];
      const lastIndexInPath = currentPath[currentPath.length - 1].index;
  
      // examine the connections of the last waypoint in our currently chosen path.
      const availableConnections = this.wayPoints[lastIndexInPath].connections.filter(conn => !encounteredIndices.includes(conn.index));

      if (availableConnections.length === 0) {
        i = (i + 1) % possiblePaths.length;
        continue;
      }

      const foundDestination = availableConnections.find(connection => connection.index === destinationIndex);

      if (foundDestination) {
        currentPath.push(new WaypointConnection(foundDestination.index, foundDestination.direction));
        return currentPath;
      } else {
        // grab first item, which we'll place onto the current path after we duplicate the path
        // for each additional connection to make new paths.
        const currentConnection = availableConnections.pop();
        
        for (const connection of availableConnections) {
          possiblePaths.push([...currentPath, new WaypointConnection(connection.index, connection.direction)]);
          encounteredIndices.push(connection.index);
        }

        currentPath.push(new WaypointConnection(currentConnection.index, currentConnection.direction));
        encounteredIndices.push(currentConnection.index);

        i = (i + 1) % possiblePaths.length;
      }
    }
  }

  private calculateTileSize(width: number, height: number) {
    return 20;
  } 

  private buildWaypoints() {
    var mapWidth = this.mapData[0].length;
    var mapHeight = this.mapData.length;
    var jCount = 0;

  
    // create initial waypoints
    for (var y = 0; y < mapHeight; y++) {
      this.wayPointIndex[y] = [];
      for (var x = 0; x < mapWidth; x++) {
        // should these waypoints also include ghost-only traversable?
        // should we have separate waypoints for the ghosts to use? or maybe just separate connections?
        // if pacman is controllable by AI, we'll need to make this distinguished between the two
        if(this.isTraversable(x, y)){
          this.wayPoints[jCount] = new Waypoint(x, y, []);
          this.wayPointIndex[y][x] = jCount;
          jCount++;
        }
      }
    }
  
    // connect the waypoints together
    for (const wayPoint of Object.values(this.wayPoints)) {
      wayPoint.addConnections(this.collectWaypointNeighbours(wayPoint));
    }
  } 

  private collectWaypointNeighbours(waypoint: Waypoint){
    const x = waypoint.x;
    const y = waypoint.y;

    const nearestGrids: [X, Y, Direction][] = [[-1, 0, "left"], [0, -1, "up"], [1, 0, "right"], [0, 1, "down"]];
    const neighbours: WaypointConnection[] = [];
  
    // immediate neighbours
    nearestGrids.forEach((grid) => {
      const mapTile = this.mapData[y + grid[1]][x + grid[0]];
      if (mapTile && this.isTileTraversable(mapTile.tile) && mapTile.tile !== TileType.TeleportPad) {
        neighbours.push(new WaypointConnection(this.wayPointIndex[y + grid[1]][x + grid[0]], grid[2]));
      }
    });
  
    // if the current waypoint is a teleport pad, add the destination as an available "neighbour"
    if(this.isTeleportPad(x, y)) {
      const pad = this.mapData[y][x].pad;
      neighbours.push(new WaypointConnection(this.wayPointIndex[pad.y][pad.x], pad.direction));
    }
  
    return neighbours;
  }

  private renderPacs(){
    this.ctx.save();
    this.ctx.strokeStyle = "white";
    this.ctx.fillStyle = "white";
    this.ctx.beginPath();

    const mapHeight = this.mapData.length;
    // currently everything assumes rectangles. if this assumption ever ends up false, all logic
    // should be re-examined.
    const mapWidth = this.mapData[0].length;

    for (let y = 0; y < mapHeight; ++y) {
      for (let x = 0; x < mapWidth; ++x) {
        this.renderPac(x, y, true);
      }
    }
  
    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.restore();
  }

  private renderPac(x: number, y: number, on: boolean) {
    const tileSize = this.tileSize;
    const pacSize = 2;

    if (on) {
      // These only happen when we're actively drawing the pacs.
      if (this.isSmallPac(x, y)) {
        this.ctx.fillRect(
          ((x * tileSize) + (tileSize / 2) - pacSize / 2) | 0,
          ((y * tileSize) + (tileSize / 2) - pacSize / 2) | 0,
          pacSize,
          pacSize
        );
      }
      if (this.isBigPac(x, y)) {
        // doesn't use pacSize, but probably should
        this.ctx.moveTo((x * tileSize) + (tileSize / 4) + (tileSize / 2), (y * tileSize) + (tileSize / 2));
        this.ctx.arc((x * tileSize) + (tileSize / 2), (y * tileSize) + (tileSize / 2), tileSize / 4, Math.PI * 2, -Math.PI * 2)
      }
    } else {
      // clear the pac from the map cached context.
      this.ctx.fillRect(
        x * tileSize,
        y * tileSize,
        tileSize,
        tileSize);
    }
  }

  private renderMap() {
    this.ctx.fillRect(0, 0, this.width, this.height);
    this.ctx.save();

    const tileSize = this.tileSize;
    const lineWidth = 2;
  
    const nullGates: [number, number, string][] = [];
    const falseWalls: [number, number, string][] = [];

    let neighbours: [string] | [TileType, string] | undefined;

    this.ctx.strokeStyle = this.wallColor;
    this.ctx.lineWidth = lineWidth;
    this.ctx.beginPath();
  
    for(var y = 0; y < this.mapData.length; ++y){
      for(var x = 0; x < this.mapData[y].length; ++x){
        neighbours = this.examineTileForRendering(x, y);
        if(neighbours === undefined) continue;
  
        if(neighbours.length > 1){
          if(neighbours[0] === TileType.GhostSpawnDoor){
            nullGates.push([x, y, neighbours[1]]);
            continue;
          }
  
          if(neighbours[0] === TileType.GhostSpawnWall){
            falseWalls.push([x, y, neighbours[1]]);
            continue;
          }
        }
  
        switch(neighbours[1].substr(0, 4)){
          case "1010": // top & bottom open
          case "0010": // bottom open
          case "1000": // top open
            this.ctx.moveTo((x * tileSize), (y * tileSize) + (tileSize / 2));
            this.ctx.lineTo((x * tileSize) + tileSize, (y * tileSize) + (tileSize / 2));
            break;
          case "0101": // left & right open
          case "0001": // left open
          case "0100": // right open
            this.ctx.moveTo((x * tileSize) + (tileSize / 2), (y * tileSize));
            this.ctx.lineTo((x * tileSize) + (tileSize / 2), (y * tileSize) + tileSize);
            break;
          case "1100": // top & right open
            // horizontal portion
            this.ctx.moveTo((x * tileSize), (y * tileSize) + (tileSize / 2));
            this.ctx.lineTo((x * tileSize) + ((tileSize / 2) - (lineWidth / 2)), (y * tileSize) + (tileSize / 2));
            // vertical portion
            this.ctx.moveTo((x * tileSize) + (tileSize / 2), (y * tileSize) + ((tileSize / 2) + (lineWidth / 2)));
            this.ctx.lineTo((x * tileSize) + (tileSize / 2), (y * tileSize) + tileSize);
            break;
          case "1001": // top & left open
            // horizontal portion
            this.ctx.moveTo((x * tileSize) + ((tileSize / 2) + (lineWidth / 2)), (y * tileSize) + (tileSize / 2));
            this.ctx.lineTo((x * tileSize) + tileSize, (y * tileSize) + (tileSize / 2));
            // vertical portion
            this.ctx.moveTo((x * tileSize) + (tileSize / 2), (y * tileSize) + ((tileSize / 2) + (lineWidth / 2)));
            this.ctx.lineTo((x * tileSize) + (tileSize / 2), (y * tileSize) + tileSize);
            break;
          case "0110": // bottom & right open
            // horizontal portion
            this.ctx.moveTo((x * tileSize), (y * tileSize) + (tileSize / 2));
            this.ctx.lineTo((x * tileSize) + ((tileSize / 2) - (lineWidth / 2)), (y * tileSize) + (tileSize / 2));
            // vertical portion
            this.ctx.moveTo((x * tileSize) + (tileSize / 2), (y * tileSize));
            this.ctx.lineTo((x * tileSize) + (tileSize / 2), (y * tileSize) + ((tileSize / 2) - (lineWidth / 2)));
            break;
          case "0011": // bottom & left open
            // horizontal portion
            this.ctx.moveTo((x * tileSize) + ((tileSize / 2) + (lineWidth / 2)), (y * tileSize) + (tileSize / 2));
            this.ctx.lineTo((x * tileSize) + tileSize, (y * tileSize) + (tileSize / 2));
            // vertical portion
            this.ctx.moveTo((x * tileSize) + (tileSize / 2), (y * tileSize));
            this.ctx.lineTo((x * tileSize) + (tileSize / 2), (y * tileSize) + ((tileSize / 2) - (lineWidth / 2)));
            break;
        }
  
        switch(neighbours[1]){
          case "00-1000-1-1": // bottom edge of map
          case "-1000-1-100": // top edge of map
            this.ctx.moveTo((x * tileSize), (y * tileSize) + (tileSize / 2));
            this.ctx.lineTo((x * tileSize) + tileSize, (y * tileSize) + (tileSize / 2));
            break;
          case "0-1000-1-10": // right edge of map
          case "000-1-100-1": // left edge of map
            this.ctx.moveTo((x * tileSize) + (tileSize / 2), (y * tileSize));
            this.ctx.lineTo((x * tileSize) + (tileSize / 2), (y * tileSize) + tileSize);
            break;
          case "-1001-1-101": // right teleport top edge of map
          case "-100-1-1-10-1": // top left edge of map
          case "100-1-110-1": // bottom teleport left edge of map
          case "00000010": // bottom right open
            // horizontal portion
            this.ctx.moveTo((x * tileSize) + ((tileSize / 2) + (lineWidth / 2)), (y * tileSize) + (tileSize / 2));
            this.ctx.lineTo((x * tileSize) + tileSize, (y * tileSize) + (tileSize / 2));
            // vertical portion
            this.ctx.moveTo((x * tileSize) + (tileSize / 2), (y * tileSize) + ((tileSize / 2) + (lineWidth / 2)));
            this.ctx.lineTo((x * tileSize) + (tileSize / 2), (y * tileSize) + tileSize);
            break;
          case "-1100-1-110": // left teleport top edge of map
          case "1-1001-1-10": // bottom teleport right edge of map
          case "-1-100-1-1-10": // top right edge of map
          case "00000001": // bottom left open
            // horizontal portion
            this.ctx.moveTo((x * tileSize), (y * tileSize) + (tileSize / 2));
            this.ctx.lineTo((x * tileSize) + ((tileSize / 2) - (lineWidth / 2)), (y * tileSize) + (tileSize / 2));
            // vertical portion
            this.ctx.moveTo((x * tileSize) + (tileSize / 2), (y * tileSize) + ((tileSize / 2) + (lineWidth / 2)));
            this.ctx.lineTo((x * tileSize) + (tileSize / 2), (y * tileSize) + tileSize);
            break;
          case "00-1110-1-1": // right teleport bottom edge of map
          case "00-1-1-10-1-1": // bottom left edge of map
          case "001-1-101-1": // top teleport left edge of map
          case "00000100": // top right open
            // horizontal portion
            this.ctx.moveTo((x * tileSize) + ((tileSize / 2) + (lineWidth / 2)), (y * tileSize) + (tileSize / 2));
            this.ctx.lineTo((x * tileSize) + tileSize, (y * tileSize) + (tileSize / 2));
            // vertical portion
            this.ctx.moveTo((x * tileSize) + (tileSize / 2), (y * tileSize));
            this.ctx.lineTo((x * tileSize) + (tileSize / 2), (y * tileSize) + ((tileSize / 2) - (lineWidth / 2)));
            break;
          case "01-1001-1-1": // left teleport bottom edge of map
          case "0-1100-1-11": // top teleport right edge of map
          case "0-1-100-1-1-1": // bottom right edge of map
          case "00001000": // top left open
            // horizontal portion
            this.ctx.moveTo((x * tileSize), (y * tileSize) + (tileSize / 2));
            this.ctx.lineTo((x * tileSize) + ((tileSize / 2) - (lineWidth / 2)), (y * tileSize) + (tileSize / 2));
            // vertical portion
            this.ctx.moveTo((x * tileSize) + (tileSize / 2), (y * tileSize));
            this.ctx.lineTo((x * tileSize) + (tileSize / 2), (y * tileSize) + ((tileSize / 2) - (lineWidth / 2)));
            break;
        }
      }
    }
  
    this.ctx.stroke();
    this.ctx.closePath();
  
    this.ctx.strokeStyle = this.wallColor;
    this.ctx.lineWidth = lineWidth;
    this.ctx.beginPath();
  
    for (const [x, y, neighbours] of falseWalls) {
      switch(neighbours.substr(0,4)){
        case "1010":
          this.ctx.moveTo((x * tileSize), (y * tileSize) + (tileSize / 2) - lineWidth);
          this.ctx.lineTo((x * tileSize) + tileSize, (y * tileSize) + (tileSize / 2) - lineWidth);
  
          this.ctx.moveTo((x * tileSize), (y * tileSize) + (tileSize / 2) + lineWidth);
          this.ctx.lineTo((x * tileSize) + tileSize, (y * tileSize) + (tileSize / 2) + lineWidth);
          break;
        case "0101":
          this.ctx.moveTo((x * tileSize) + (tileSize / 2) - lineWidth, (y * tileSize));
          this.ctx.lineTo((x * tileSize) + (tileSize / 2) - lineWidth, (y * tileSize) + tileSize);
  
          this.ctx.moveTo((x * tileSize) + (tileSize / 2) + lineWidth, (y * tileSize));
          this.ctx.lineTo((x * tileSize) + (tileSize / 2) + lineWidth, (y * tileSize) + tileSize);
          break;
        case "0110":
          // horizontal portion inner
          this.ctx.moveTo((x * tileSize), (y * tileSize) + (tileSize / 2) - lineWidth);
          this.ctx.lineTo((x * tileSize) + ((tileSize / 2) - (lineWidth / 2)), (y * tileSize) + (tileSize / 2) - lineWidth);
          // vertical portion inner
          this.ctx.moveTo((x * tileSize) + (tileSize / 2) - lineWidth, (y * tileSize));
          this.ctx.lineTo((x * tileSize) + (tileSize / 2) - lineWidth, (y * tileSize) + ((tileSize / 2) - (lineWidth / 2)));
          // horizontal portion outer
          this.ctx.moveTo((x * tileSize), (y * tileSize) + (tileSize / 2) + lineWidth);
          this.ctx.lineTo((x * tileSize) + (tileSize / 2) + lineWidth + lineWidth / 2, (y * tileSize) + (tileSize / 2) + lineWidth);
          // vertical portion outer
          this.ctx.moveTo((x * tileSize) + (tileSize / 2) + lineWidth, (y * tileSize));
          this.ctx.lineTo((x * tileSize) + (tileSize / 2) + lineWidth, (y * tileSize) + (tileSize / 2) + lineWidth + lineWidth / 2);
          break;
        case "1001":
          // horizontal portion inner
          this.ctx.moveTo((x * tileSize) + ((tileSize / 2) + (lineWidth / 2)), (y * tileSize) + (tileSize / 2) + lineWidth);
          this.ctx.lineTo((x * tileSize) + tileSize, (y * tileSize) + (tileSize / 2) + lineWidth);
          // vertical portion inner
          this.ctx.moveTo((x * tileSize) + (tileSize / 2) + lineWidth, (y * tileSize) + (tileSize / 2) + lineWidth);
          this.ctx.lineTo((x * tileSize) + (tileSize / 2) + lineWidth, (y * tileSize) + tileSize);
          // horizontal portion outer
          this.ctx.moveTo((x * tileSize) + (tileSize / 2) - lineWidth - (lineWidth / 2), (y * tileSize) + (tileSize / 2) - lineWidth);
          this.ctx.lineTo((x * tileSize) + tileSize, (y * tileSize) + (tileSize / 2) - lineWidth);
          // vertical portion outer
          this.ctx.moveTo((x * tileSize) + (tileSize / 2) - lineWidth, (y * tileSize) + (tileSize / 2) - lineWidth - (lineWidth / 2));
          this.ctx.lineTo((x * tileSize) + (tileSize / 2) - lineWidth, (y * tileSize) + tileSize);
          break;
        case "0011":
          // horizontal portion inner
          this.ctx.moveTo((x * tileSize) + ((tileSize / 2) + (lineWidth / 2)), (y * tileSize) + (tileSize / 2) - lineWidth);
          this.ctx.lineTo((x * tileSize) + tileSize, (y * tileSize) + (tileSize / 2) - lineWidth);
          // vertical portion inner
          this.ctx.moveTo((x * tileSize) + (tileSize / 2) + lineWidth, (y * tileSize));
          this.ctx.lineTo((x * tileSize) + (tileSize / 2) + lineWidth, (y * tileSize) + ((tileSize / 2) - (lineWidth / 2)));
          // horizontal portion outer
          this.ctx.moveTo((x * tileSize) + (tileSize / 2) - lineWidth - lineWidth / 2, (y * tileSize) + (tileSize / 2) + lineWidth);
          this.ctx.lineTo((x * tileSize) + tileSize, (y * tileSize) + (tileSize / 2) + lineWidth);
          // vertical portion outer
          this.ctx.moveTo((x * tileSize) + (tileSize / 2) - lineWidth, (y * tileSize));
          this.ctx.lineTo((x * tileSize) + (tileSize / 2) - lineWidth, (y * tileSize) + (tileSize / 2) + lineWidth + lineWidth / 2);
          break;
        case "1100":
          // horizontal portion inner
          this.ctx.moveTo((x * tileSize), (y * tileSize) + (tileSize / 2) + lineWidth);
          this.ctx.lineTo((x * tileSize) + ((tileSize / 2) - (lineWidth / 2)), (y * tileSize) + (tileSize / 2) + lineWidth);
          // vertical portion inner
          this.ctx.moveTo((x * tileSize) + (tileSize / 2) - lineWidth, (y * tileSize) + ((tileSize / 2) + (lineWidth / 2)));
          this.ctx.lineTo((x * tileSize) + (tileSize / 2) - lineWidth, (y * tileSize) + tileSize);
          // horizontal portion outer
          this.ctx.moveTo((x * tileSize), (y * tileSize) + (tileSize / 2) - lineWidth);
          this.ctx.lineTo((x * tileSize) + (tileSize / 2) + lineWidth + lineWidth / 2, (y * tileSize) + (tileSize / 2) - lineWidth);
          // vertical portion outer
          this.ctx.moveTo((x * tileSize) + (tileSize / 2) + lineWidth, (y * tileSize) + (tileSize / 2) - lineWidth - lineWidth / 2);
          this.ctx.lineTo((x * tileSize) + (tileSize / 2) + lineWidth, (y * tileSize) + tileSize);
          break;
      }
    }
  
    this.ctx.stroke();
    this.ctx.closePath();
  
    this.ctx.strokeStyle = "white";
    this.ctx.lineWidth = lineWidth;
    this.ctx.beginPath();
  
    for (const [x, y, neighbours] of nullGates) {
      switch(neighbours.substr(0, 4)){
        case "1010":
          this.ctx.moveTo((x * tileSize), (y * tileSize) + (tileSize / 2));
          this.ctx.lineTo((x * tileSize) + tileSize, (y * tileSize) + (tileSize / 2));
          break;
        case "0101":
          this.ctx.moveTo((x * tileSize) + (tileSize / 2), (y * tileSize));
          this.ctx.lineTo((x * tileSize) + (tileSize / 2), (y * tileSize) + tileSize);
          break;
      }
    }
  
    this.ctx.stroke();
    this.ctx.closePath();
    this.ctx.restore();
  }

  examineTileForRendering(x: number, y: number): [string] | [TileType, string] | undefined {
    // if it's traversable, there's nothing to render - so we return undefined.
    if(this.isTraversable(x, y)) return undefined;
  
    let neighbourString = "";

    // check all neighbouring tiles to put together a pattern to help us render this tile.
    for (const [nX, nY] of [[0, -1], [1, 0], [0, 1], [-1, 0], [-1, -1], [1, -1], [1, 1], [-1, 1]]) {
      if(this.mapData[y + nY] !== undefined){
        if(this.mapData[y + nY][x + nX] !== undefined){
          if(this.isTraversable(x + nX, y + nY)) {
            // traversable
            neighbourString += "1";
          } else {
            // not traversable
            neighbourString += "0";
          }
          continue;
        }
      }

      // not part of the map
      neighbourString += "-1";
    };
  
    // ghost spawn doors, and walls, use different rendering patterns than normal sections of wall.
    // this helps identify them.
    if(
      this.mapData[y] && this.mapData[y][x] &&
      (this.mapData[y][x].tile === TileType.GhostSpawnDoor
      || this.mapData[y][x].tile === TileType.GhostSpawnWall)
    ) {
      return [this.mapData[y][x].tile, neighbourString];
    }
  
    return [undefined, neighbourString];
  }
}

export default new Map();
