import {SimulationNodeDatum} from 'd3-force';
import {Drawable} from '../drawable';
import {defaultRadius} from '../../consts';
import {Selection} from 'd3-selection';
import {ArrayCell} from '../structures/array/array-cell';
import * as d3 from 'd3';

export class SimulationNode implements SimulationNodeDatum {
  radius = defaultRadius;
  isValueVisible = true;
  isPlaceholder = false;
  noCollision = false;
  isInteractable = true;
  drawArrow = false;
  highlighted = false;
  z = 0;
  // TODO
  // TODO
  lockedGraph = undefined;
  lockedGrid?: ArrayCell;
  hoveringGrid?: ArrayCell;
  dragStartX?: number;
  dragStartY?: number;
  parent?: SimulationNode;
  children?: SimulationNode[];
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
  element: Selection<any, any, HTMLElement, any>;
  value: number;

  constructor(value: number, id: number, x: number, y: number) {
    this.value = value;
    this.id = id;
    this.cx = x;
    this.cy = y;
    this.x = x;
    this.y = y;
  }

  clicked(): void {
    if (!!this.onClick) {
      this.onClick(this);
      return;
    }
    if (this.isPlaceholder || !this.isInteractable || this.isValueVisible) {
      return;
    }
    this.isValueVisible = true;
  }

  setTransform(x: number, y: number): void {
    this.cx = x;
    this.cy = y;
    this.x = x;
    this.y = y;
  }
}
