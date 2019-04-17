
type Value = string | number;

class Debug {
  private debugEle: HTMLTableRowElement;

  private values: { [key: string]: Value } = {};

  constructor() {
    this.debugEle = document.querySelector('tr#debugData');  
  }

  display = (key: string, val: Value) => {
    
  }

  private clear() {
    while (this.debugEle.firstChild) {
      this.debugEle.removeChild(this.debugEle.firstChild);
    }
  }
}