import {SimulationNode} from '../../basics/simulation-node';
import {SimulationArray} from './simulation-array';
import {ArrayCellDrawing} from '../../behaviors/drawing/array-cell-drawing';
import {ArrayDrawing} from '../../behaviors/drawing/array-drawing';
import {Selection} from 'd3-selection';
import * as d3 from 'd3';
import {ArrayCellMouse} from '../../behaviors/mouse/array-cell-mouse';
import {DrawingBehavior} from '../../behaviors/drawing/drawing-behavior';
import {d3Element, MouseBehavior} from '../../behaviors/mouse/mouse-behavior';

export class ArrayCell {
  x: number;
  y: number;
  width: number;
  height: number;
  index: number;
  node?: SimulationNode;
  hoveringNode?: SimulationNode;
  parent: SimulationArray;

  drawingBehavior: DrawingBehavior<ArrayCell>;
  mouseBehavior: MouseBehavior<ArrayCell>;

  constructor(drawingBehavior: ArrayCellDrawing,
              mouseBehavior: ArrayCellMouse,
              parent: SimulationArray,
              x: number,
              y: number,
              width: number,
              height: number,
              index: number) {
    this.drawingBehavior = drawingBehavior;
    this.mouseBehavior = mouseBehavior;
    this.parent = parent;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.index = index;
    this.color = 'gainsboro';
  }

  isMouseOver = false;

  addNode(node: SimulationNode): void {
    this.node = node;
    this.hoveringNode = node;
    node.lockedGrid = this;
    node.hoveringGrid = this;
    node.fx = this.parent.x + this.x + this.width / 2;
    node.fy = this.height / 2 + this.parent.y;
    console.log(node);
  }

  removeNode(): SimulationNode | null {
    if (!this.node) {
      return null;
    }
    const node = this.node;
    node.lockedGrid = undefined;
    node.hoveringGrid = undefined;
    this.node = undefined;
    this.hoveringNode = undefined;
    node.fx = undefined;
    node.fy = undefined;
    return node;
  }

  toString(): string {
    return `${parent.name}[${this.index}]`;
  }

  enter(enterElement: Selection<d3.EnterElement, ArrayCell, any, any>): Selection<d3.BaseType, ArrayCell, any, any> {
    return this.drawingBehavior.enter(enterElement);
  }

  update(updateElement: Selection<d3.BaseType, ArrayCell, any, any>): Selection<d3.BaseType, ArrayCell, any, any> {
    return this.drawingBehavior.update(updateElement);
  }

  exit(exitElement: Selection<d3.BaseType, ArrayCell, any, any>): Selection<d3.BaseType, ArrayCell, any, any> {
    return this.drawingBehavior.exit(exitElement);
  }

  mouseOver(i: number, cells: d3Element[] | ArrayLike<d3Element>): void {
    this.mouseBehavior.mouseOver(this, i, cells);
  }

  mouseOut(i: number, cells: d3Element[] | ArrayLike<d3Element>): void {
    this.mouseBehavior.mouseOut(this, i, cells);
  }

  set color(color: string) {
    this.drawingBehavior.color = color;
  }

  get color(): string {
    return this.drawingBehavior.color;
  }
}
