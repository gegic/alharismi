import {Selection} from 'd3-selection';
import {Injectable} from '@angular/core';

@Injectable()
export class DataHandler {
  levelState = 0;
  drawableList = [];
  operations = 0;
  svg: Selection<any, any, HTMLElement, any>;
  windowSize: number;

  constructor(svg: Selection<any, any, HTMLElement, any>, windowSize: number) {
    this.svg = svg;
    this.windowSize = windowSize;
  }

  clearScene(): void {
    // fix the level title
    // circleManager.clear()
    // window.buttonHandler.clear()
    // this.logger.clear()

    // this.readyForNextLevel = false
    // this.drawableList.forEach(d => d.delete())
    // d3.selectAll(".textnode").remove()
    // this.drawableList = []
    // window.linkHandler.clear()
    // this.circle_count = 0
    // this.operations = 0
    // dragended()

  }
}
