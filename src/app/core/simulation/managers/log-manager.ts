import * as d3 from 'd3';
import {Selection} from 'd3-selection';

export class LogManager {
  x: number;
  y: number;
  textHeight = 20;
  fontSize = 20;
  rowCount = 9;
  extRowCount = 20;
  extRows = false;
  lastOpTime = Date.now();
  currentCombo = [];
  comboTimeout = 3000;
  svg: Selection<any, any, HTMLElement, any>;

  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.svg = d3.select('svg');
  }
}
