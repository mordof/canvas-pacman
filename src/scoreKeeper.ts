import Pacman from './sprites/pacman';

class ScoreKeeper {
  score = 0;
  pacman: Pacman;

  registerPacman(pacman: Pacman) {
    this.pacman = pacman;
  }

  add(value: number, multiplier: number) {
    const curLifeBenefit = (this.score / 10000) | 0;
    this.score = this.score + (value * multiplier);
    const newLifeBenefit = (this.score / 10000) | 0;
    if (newLifeBenefit > curLifeBenefit) {
      this.pacman.lives = this.pacman.lives + (newLifeBenefit - curLifeBenefit);
    }
  }
}

export default new ScoreKeeper();