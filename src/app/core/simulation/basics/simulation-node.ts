import {SimulationNodeDatum} from 'd3-force';
import {defaultRadius} from '../../consts';
import {Selection} from 'd3-selection';
import {ArrayCell} from '../structures/array/array-cell';
import * as d3 from 'd3';
import {BstCell} from '../structures/tree/bst-cell';
import {Drawable} from '../drawable';

export class SimulationNode implements SimulationNodeDatum, Drawable {

  radius = 40;
  isValueVisible = true;
  isInteractable = true;
  drawArrow = false;
  highlighted = false;
  nodeOrder = 1;

  noCollision = false;
  pointerEvents = true;

  lockedPlaceholder?: BstCell;
  hoveringPlaceholder?: BstCell;
  // parent?: SimulationNode;
  children?: SimulationNode[];
  isPlaceholder = false;

  lockedGrid?: ArrayCell;
  hoveringGrid?: ArrayCell;

  dragStartX?: number;
  dragStartY?: number;
  onClick?: (nodeInfo: SimulationNode) => void;

  id: number | undefined;
  fx: number | null | undefined;
  fy: number | null | undefined;
  vx: number | undefined;
  vy: number | undefined;
  x: number | undefined;
  y: number | undefined;
  cx: number | undefined;
  cy: number | undefined;
  value: number;

  constructor(value: number, id: number, x: number, y: number) {
    this.value = value;
    this.id = id;
    this.cx = x;
    this.cy = y;
    this.x = x;
    this.y = y;
  }

  setTarget(x: number, y: number): void {
    this.cx = x;
    this.cy = y;
  }

  move(x: number, y: number): void {
    if (!this.noCollision) {
      this.cx = x;
      this.cy = y;
    } else {
      this.x = x;
      this.y = y;
    }
  }
}
