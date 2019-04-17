class FrameData {
  public delta: number;
  public fps: number = 0;
  public frame: number = 0;

  private previousTimestamp: number = 0;
  private fpsCounter: number = 0;
  private fpsUpdatedAt: number = 0;

  update = (timestamp: number) => {
    this.delta = timestamp - this.previousTimestamp;
    this.previousTimestamp = timestamp;

    this.fpsCounter++;
    this.frame++;

    if (timestamp - this.fpsUpdatedAt >= 1000) {
      this.fpsUpdatedAt = timestamp;
      this.fps = this.fpsCounter;
      this.fpsCounter = 0;
    }
  }
}

export default new FrameData();