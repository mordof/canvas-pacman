import Ghost from '../../sprites/ghost';
import { Direction } from '../../controller';
import { findOppositeDirection } from '../../lib/direction';
import { default as InputHandler, InputCallback } from '../input-handler-base';
import map from '../../map';

export default class GhostAI extends InputHandler<Ghost> {
  connect(controllable: Ghost, callback: InputCallback) {
    super.connect(controllable, callback);
    controllable.registerAfterMoveHook(this.afterMove);
  }

  afterMove() {
    const ghost = this.controllable;
    const { wayPoints } = map;
    let targetWaypoint;

    //ghost has updated thier grid location
    //a move has finished, we can make decisions and do AI stuff here
    if (ghost.AIstate == 'inPen')
      targetWaypoint = ghost.wayPoints[ghost.nextWayPoint];
    else if (ghost.AIstate == "headingHome")
      targetWaypoint = ghost.wayPoints[ghost.deathWaypointPath[0]];
    else if (ghost.AIstate == "enteringHomeDead")
      targetWaypoint = ghost.wayPoints[ghost.nextWayPoint];
    else
      targetWaypoint = ghost.wayPoints[ghost.nextWayPoint];

    // if we've arrived at a waypoint
    if(targetWaypoint && ghost.xTilePos == targetWaypoint[0] && ghost.yTilePos == targetWaypoint[1]){
      if (ghost.AIstate == "headingHome") {
        // find the direction to go between the point we're currently at, and the next point in the death path
        // and set the leftState/rightState/upState/downState to true as necessary
        let newDirection: Direction;
        if(ghost.deathWaypointPath.length > 1) {
          newDirection = ghost.deathWaypointPath.direction;
        } else {
          newDirection = findOppositeDirection(ghost.wayPoints[ghost.wayPoints.length - 2][2]);
        }

        this.sendInput(newDirection);
       
        ghost.deathWaypointPath.shift();

        if(ghost.deathWaypointPath.length == 0){
          ghost.AIstate = "enteringHomeDead";
          ghost.nextWayPoint = 1;
        }
      } else if (ghost.AIstate == "enteringHomeDead") {
        ghost.nextWayPoint--;
        if(ghost.nextWayPoint == -1){
          ghost.AIstate = "inPen";
          ghost.alive = true;
          ghost.endPanic();

          // give a timeout for him to leave the pen again.
          setTimeout(
            () => {
              ghost.nextWayPoint = 1;
              this.sendInput(ghost.wayPoints[0][2]);
            },
            ghost.deathTimeout,
          );
        } else {
          this.sendInput(findOppositeDirection(ghost.wayPoints[ghost.nextWayPoint][2]));
        }
      } else if (ghost.AIstate == "inPen") {
        this.sendInput(targetWaypoint[2]);
        ++ghost.nextWayPoint;

        // we've run out of waypoints and should be "out of the pen" by this point. switch to roaming.
        // if for whatever reason, the ghost is not out of the pen here.... you're an idiot.
        // (check your last "In Pen" waypoint and ensure it matches a global waypoint location)
        if(ghost.nextWayPoint == ghost.wayPoints.length - 1){
          ghost.nextWayPoint = wayPointLookup[0][ghost.wayPoints[ghost.nextWayPoint][1]][ghost.wayPoints[ghost.nextWayPoint][0]];
          ghost.AIstate = 'roaming';
        }
      } else { // default state of "roaming"
        // we're currently on a waypoint. get the ID.
        const wayPointID = wayPointLookup[0][ghost.yTilePos][ghost.xTilePos];
        const pacmanWaypointID = wayPointLookup[0][pacman.yTilePos][pacman.xTilePos]

        const waypoints = getWaypointsToDest(0, wayPointID, pacmanWaypointID)
        let direction;

        if(waypoints && waypoints.length > 1)
          direction = waypoints[0].direction;
        else
          direction = false;

        const nextWaypoint = waypoints[1];

        // the code above tells the ghosts to head right for pacman... but
        // for the example currently i don't really want that.
        // so we'll force them to go back to default and just roam randomly

        direction = false;

        if(direction === false){
          // // choose the next waypoint
          const newWaypoints = filterWaypointsByDirection(wayPoints[wayPointID][2], ghost.direction);
          ghost.childWaypoints = wayPoints[wayPointID][2];

          newWayPoint = newWaypoints[(Math.random() * newWaypoints.length) | 0];

          nextWaypoint = newWayPoint[0];
          direction = newWayPoint[1];
        }

        ghost.nextWayPoint = nextWaypoint;
        this.sendInput(direction);
      }
    }
  }
}
