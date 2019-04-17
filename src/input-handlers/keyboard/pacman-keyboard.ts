import Pacman from '../../sprites/pacman';
import InputHandler from '../input-handler-base';

export default class PacmanKeyboard extends InputHandler<Pacman> {
  constructor() {
    super();

    document.onkeydown = (event) => {
      if (!this.connected) { return; }

      switch (event.key)
      {
        case 'ArrowLeft': this.sendInput('left'); break;
        case 'ArrowRight': this.sendInput('right'); break;
        case 'ArrowUp': this.sendInput('up'); break;
        case 'ArrowDown': this.sendInput('down'); break;
      }
    }
  }
}
