import { Container } from "pixi.js";
import { Manager } from "../manager.js";
export class ConnectionLayer extends Container {
  constructor() {
    super();
    this.screenWidth = Manager.width;
    this.screenHeight = Manager.height;
  }

  drawLine(from, to, line, width, color) {
    line.clear();
    line.moveTo(from.x, from.y);
    line.quadraticCurveTo(to.x, from.y, to.x, to.y);
    line.stroke({ width: 2, color: color });
    return line;
  }

  resize(newWidth, newHeight) {
    this.screenWidth = newWidth;
    this.screenHeight = newHeight;
  }

  update(deltaTime) {}
}
