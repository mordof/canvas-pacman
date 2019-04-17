import scoreKeeper from './scoreKeeper';
import map from './map';

import Pacman from './sprites/pacman';
import Ghost from './sprites/ghost';

import Apple from './sprites/fruits/apple';
import Cherry from './sprites/fruits/cherry';
import Peach from './sprites/fruits/peach';
import Strawberry from './sprites/fruits/strawberry';
import Watermelon from './sprites/fruits/watermelon';

export default class CollisionHandler {
  constructor (private pacman: Pacman, private tileSize: number) {}

  private ghostCollisionEnabled = true;
  private ghostKillCounter = 0;

  run(sprites: (Ghost | Pacman | Apple | Cherry | Peach | Strawberry | Watermelon)[]) {
    this.checkForCollision(sprites);

    if (this.pacman.onSpecificTile) {
      this.checkForPac(sprites);
    }
  }

  private checkForPac(sprites: (Ghost | Pacman | Apple | Cherry | Peach | Strawberry | Watermelon)[]) {
    const x = this.pacman.xTilePos;
    const y = this.pacman.yTilePos;

    if (map.isSmallPac(x, y)) {
      map.erasePac(x, y);
      scoreKeeper.add(10, 1);
    } else if (map.isBigPac(x, y)) {
      map.erasePac(x, y);

      for (const sprite of sprites) {
        if(sprite.type === 'ghost') {
          sprite.startPanic();
        }
      }

      scoreKeeper.add(50, 1);
    }
  }

  private checkForCollision(sprites: (Ghost | Pacman | Apple | Cherry | Peach | Strawberry | Watermelon)[]) {
    const { tileSize } = map;

    for (const sprite of sprites) {
      const dx = this.pacman.xPos - sprite.xPos;
      const dy = this.pacman.yPos - sprite.yPos;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < (this.pacman.collisionRadius * tileSize) + (sprite.collisionRadius * tileSize)) {
        switch (sprite.type) {
          case 'ghost':
            if (this.ghostCollisionEnabled) {
              if (sprite.panicked && sprite.alive) {
                sprite.triggerDeath();
                scoreKeeper.add(sprite.value, this.ghostKillCounter);
                this.ghostKillCounter = this.ghostKillCounter * 2;
              } else if (sprite.alive) {
                this.pacman.triggerDeath();

                // TODO: we need to trigger a ghost/pacman/fruits reset here once
                // pacman's death animation is done (if there are enough lives to continue)
              }
            }
            break;
          case 'fruit':
            scoreKeeper.add(sprite.value, 1);

            // TODO: destroy this fruit from the list of available sprites, as
            // it has been consumed.
            break;
        }
      }
    }
  }
}
