import ControllableBase from './controllable-base';
import Controller from '../controller';
import { default as map, WaypointConnection, X, Y, Direction } from '../map';
import collisionHandler from '../collision-handler';

export default class Ghost extends ControllableBase {
  collidable = true;
  width = (map.tileSize * 0.8) | 0;
  height = (map.tileSize * 0.8) | 0;
  xTilePos = 14;
  yTilePos = 15;
  xPos = map.tileSize * 14 + map.tileSize / 2;
  yPos = map.tileSize * 15;
  collisionRadius = map.tileSize * 0.4;
  alive = true;
  value = 50;

  readonly type = 'ghost';

  wayPoints: [X, Y, Direction][] = [[14, 15, 'up'], [14, 12, 'left'], [13, 12, 'left']]
  deathWaypointPath: WaypointConnection[] | null = null;
  nextWayPoint = 1;
  moveSpeed = 5;
  color: string | null = null;
  deathTimeout = 5000;
  eyeColor = "white";
  pupilColor = "blue";
  panicked = false;
  panicColors = {
    inverted: false,
    base: "blue",
    eye: "white",
    pupil: "blue",
    invertBase: "white",
    invertEye: "blue",
    invertPupil: "white"
  }
  calmMoveSpeed = 5;
  deadMoveSpeed = 12;
  panicMoveSpeed = 2.5;
  panicDuration = 6000;
  panicEndWarningDuration = 2000;
  panicSlowFlash = 250;
  panicQuickFlash = 100;
  panicIntervalHandle: number | null = null;
  AIstate = 'inPen';

  constructor(controller: Controller<Ghost>) {
    super(controller);
    controller.registerControllable(this);
  }

  reset() {
    this.xTilePos = 14;
    this.yTilePos = 15;
    this.xPos = map.tileSize * 14 + (map.tileSize / 2);
    this.yPos = map.tileSize * 15;
    this.queuedDirection = 'up';
    this.AIstate = 'inPen';
    this.nextWayPoint = 1;
    this.alive = true;
    this.panicked = false;
  }

  triggerDeath() {
    if (!this.alive) return;
  
    this.alive = false;
    this.moveSpeed = this.deadMoveSpeed;
    this.AIstate = "headingHome";
    this.deathWaypointPath = map.getWaypointsToDest(this.nextWayPoint, map.wayPointIndex[this.wayPoints[this.wayPoints.length-1][1]][this.wayPoints[this.wayPoints.length-1][0]]);
  }

  triggerAlive() {
    this.alive = true;
    this.moveSpeed = this.calmMoveSpeed;
  }

  startPanic() {
    if(!this.alive) return false;

    this.panicked = true;
    this.moveSpeed = this.panicMoveSpeed;
  
    this.panicIntervalHandle = setInterval(
      () => {
        this.panicColors.inverted = !this.panicColors.inverted
      },
      this.panicSlowFlash,
    );
  
    setTimeout(
      () => {
        clearInterval(this.panicIntervalHandle);
        this.panicIntervalHandle = setInterval(
          () => {
            this.panicColors.inverted = !this.panicColors.inverted;
          },
          this.panicQuickFlash,
        );
      },
      this.panicDuration - this.panicEndWarningDuration,
    );
  
    setTimeout(
      () => {
        this.endPanic();
        collisionHandler.resetGhostKillCounter();
      },
      this.panicDuration,
    );
  }

  endPanic() {
    this.panicked = false;

    if(this.alive) {
      this.moveSpeed = this.calmMoveSpeed;
    }

    clearInterval(this.panicIntervalHandle);
  }

  draw(ctx: CanvasRenderingContext2D) {
    var zScaler = map.tileSize / 18;
    var xEyeOffset = 0, yEyeOffset = 0;
    var eyeSize = 4 * zScaler;
    switch (this.direction) {
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
    ctx.translate(this.xPos - (map.tileSize / 3), this.yPos - (map.tileSize / 4));

    if(this.alive){
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
  
    if(this.alive){
      ctx.fillStyle = this.panicked ? (this.panicColors.inverted ? this.panicColors.invertEye : this.panicColors.eye) : this.eyeColor;
    } else {
      ctx.fillStyle = this.eyeColor;
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
  
    if(this.alive){
      ctx.fillStyle = this.panicked ? (this.panicColors.inverted ? this.panicColors.invertPupil : this.panicColors.pupil) : this.pupilColor;
    } else {
      ctx.fillStyle = this.pupilColor;
    }
  
    ctx.beginPath();
    ctx.fillRect((7*zScaler)+xEyeOffset,(11*zScaler)+yEyeOffset,eyeSize,eyeSize);
    ctx.fillRect((19*zScaler)+xEyeOffset,(11*zScaler)+yEyeOffset,eyeSize,eyeSize);
    ctx.fill();
    ctx.restore();
  }
}
