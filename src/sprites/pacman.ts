import ControllableBase from './controllable-base';
import Controller from '../controller';
import map from '../map';
import frameData from '../frameData';

export default class Pacman extends ControllableBase {
  collidable = true;
  width = (map.tileSize * 0.8) | 0;
  height = (map.tileSize * 0.8) | 0;
  xTilePos = 14;
  yTilePos = 24;
  xPos = map.tileSize * 14;
  yPos = map.tileSize * 24;
  collisionRadius = map.tileSize * 0.4;
  alive = true;

  readonly type = 'pacman';
  onSpecificTile: boolean = false;

  animationFirstDuration = 150;
  animationSecondDuration = 150;
  mouthOpenAngle = 0.7;
  mouthClosedAngle = 0;
  angleDelta = this.mouthOpenAngle;
  animationState: 'closing' | 'opening' = 'closing';
  colors = ["yellow", "red", "blue", "green", "orange", "white"];
  maniac = false;
  lives = 3;

  constructor(controller: Controller<Pacman>) {
    super(controller);
    controller.registerControllable(this);
  }

  reset = () => {
    this.xTilePos = 14;
    this.yTilePos = 24;
    this.xPos = map.tileSize * 14 + map.tileSize / 2;
    this.yPos = map.tileSize * 24;
    this.angleDelta = this.mouthOpenAngle;
    this.animationState = 'closing';
    this.maniac = false;
  }

  triggerDeath = () => {
    if (!this.alive) return;
  
    this.alive = false;
    this.lives = this.lives - 1;
  }

  draw = (ctx: CanvasRenderingContext2D) => {
    // if(this.moving || this.queuedMovement) {
      if(this.animationState == "closing") {
        this.angleDelta = this.angleDelta - (this.mouthOpenAngle * (frameData.delta / this.animationFirstDuration));
        if(this.angleDelta < this.mouthClosedAngle){
          this.angleDelta = this.mouthClosedAngle;
          this.animationState = "opening";
        }
      } else if(this.animationState == "opening") {
        this.angleDelta = this.angleDelta + (this.mouthOpenAngle * (frameData.delta / this.animationSecondDuration));
        if(this.angleDelta > this.mouthOpenAngle){
          this.angleDelta = this.mouthOpenAngle;
          this.animationState = "closing";
        }
      }
    // } else {
      // TODO: pretty sure this is here for when pacman hits a wall, or is otherwise unable
      // to move. We'll need to implement these conditions properly again.
      
      // this.angleDelta = 0.5;
    // }

    let topAngle;
    let bottomAngle;
  
    switch(this.direction){
      case "right":
        topAngle = this.angleDelta;
        bottomAngle = 6.3 - this.angleDelta;
        break;
      case "down": 
        topAngle = (Math.PI / 2) + this.angleDelta;
        bottomAngle = (Math.PI / 2) - this.angleDelta;
        break;
      case "up": 
        topAngle = ((Math.PI * 3) / 2) + this.angleDelta;
        bottomAngle = ((Math.PI * 3) / 2) - this.angleDelta;
        break;
      case "left": 
        topAngle = Math.PI + this.angleDelta;
        bottomAngle = Math.PI - this.angleDelta;
        break;
    }
  
    if(this.angleDelta < 0.001){
      topAngle = Math.PI * 2;
      bottomAngle = -Math.PI * 2;
    }
  
    ctx.save();

    ctx.fillStyle = this.colors[0];
    ctx.fillRect(this.xPos, this.yPos, map.tileSize, map.tileSize);

    // ctx.translate(this.xPos, this.yPos);
    // ctx.fillStyle = this.maniac ? this.colors[(Math.random() * this.colors.length) | 0] : this.colors[0];
    // ctx.beginPath();
    // ctx.arc(map.tileSize / 2, map.tileSize / 2, (map.tileSize * 0.8), topAngle, bottomAngle, false);
    // ctx.lineTo(map.tileSize / 2, map.tileSize / 2);
    // ctx.fill();
    ctx.restore();
  }
}
