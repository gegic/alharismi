import {Selection} from 'd3-selection';
import {SimulationNode} from '../../basics/simulation-node';
import {ArrayCell} from './array-cell';
import {ArrayDrawing} from '../../behaviors/drawing/array-drawing';
import * as d3 from 'd3';
import {ArrayContextMenu} from '../../behaviors/context-menu/array-context-menu';
import {MenuItem} from 'd3-context-menu';
import {SimulationHandler} from '../../handlers/simulation-handler';
import {ArrayCellDrawing} from '../../behaviors/drawing/array-cell-drawing';
import {ArrayCellMouse} from '../../behaviors/mouse/array-cell-mouse';
import {DrawingBehavior} from '../../behaviors/drawing/drawing-behavior';
import {DragBehavior} from '../../behaviors/drag/drag-behavior';
import {ContextMenuBehavior} from '../../behaviors/context-menu/context-menu-behavior';
import {MouseBehavior} from '../../behaviors/mouse/mouse-behavior';

export class SimulationArray {

  cellWidth = 100;
  cellHeight = 100;

  id: number;
  size: number;
  data: ArrayCell[];
  x: number;
  y: number;
  z: number;
  isStatic: boolean;
  descriptor: string;

  drawingBehavior: DrawingBehavior<SimulationArray>;
  dragBehavior: DragBehavior<SimulationArray>;
  contextMenu: ContextMenuBehavior;

  constructor(drawingBehavior: DrawingBehavior<SimulationArray>,
              dragBehavior: DragBehavior<SimulationArray>,
              contextMenu: ContextMenuBehavior,
              id: number,
              size: number,
              x: number,
              y: number,
              descriptor?: string) {
    this.id = id;
    this.size = size;
    this.cellWidth = 100;
    this.cellWidth = 100;
    this.data = [];
    this.x = x - (size * this.cellWidth) / 2;
    this.y = y - (this.cellHeight / 2);
    this.z = -2;
    this.color = 'gainsboro';
    this.isStatic = false;
    this.descriptor = descriptor ?? `array${id}`;
  }

  add(nodes: SimulationNode[]): void {
    nodes.forEach((n, i) => this.data[i].addNode(n));
  }

  nodeAt(i: number): SimulationNode {
    if (i === this.data.length) {
      return null;
    }
    if (this.data[i].node) {
      return this.data[i].node;
    }
    else {
      return this.nodeAt(i + 1);
    }
  }

  setTransform(x: number, y: number): void {
    this.x = x;
    this.y = y;
    this.data.filter(d => d.node).forEach((d) => {
      d.node.fx = this.x + d.x + d.width / 2;
      d.node.fy = d.height / 2 + this.y;
    });
  }

  makeGrid(simulationHandler: SimulationHandler, count: number): void {
    let xpos = (this.cellWidth + this.cellWidth / 20) * this.data.length;

    const newSize = this.data.length + count;

    for (let column = this.data.length; column < newSize; column++) {
      const cell = new ArrayCell(
        new ArrayCellDrawing(),
        new ArrayCellMouse(simulationHandler),
        this, xpos,
        0,
        this.cellWidth,
        this.cellHeight,
        column
      );
      this.data.push();
      // increment the x position. I.e. move it over by 50 (width variable)
      xpos += this.cellWidth + this.cellWidth / 20; // and a little bit of margin
    }
  }

  setLength(simulationHandler: SimulationHandler, length: number): void {
    this.size = length;

    if (length < this.data.length) {
      for (let i = length ; i < this.data.length; i++)
      {
        if (!this.data[i].node) {
          continue;
        }
        const c = this.data[i].node;
        c.fx = null;
        c.fy = null;
      }
      this.data = this.data.splice(0, length);
    }
    else {
      this.makeGrid(simulationHandler, length - this.data.length);
    }
  }

  async linearFindElement(value: number): Promise<void> {}

  getContextMenu(): MenuItem[] {
    return this.contextMenu.getContextMenu();
  }

  enter(enterElement: Selection<d3.EnterElement, SimulationArray, any, any>): Selection<d3.BaseType, SimulationArray, any, any> {
    return this.drawingBehavior.enter(enterElement);
  }

  update(updateElement: Selection<d3.BaseType, SimulationArray, any, any>): Selection<d3.BaseType, SimulationArray, any, any> {
    return this.drawingBehavior.update(updateElement);
  }

  exit(exitElement: Selection<d3.BaseType, SimulationArray, any, any>): Selection<d3.BaseType, SimulationArray, any, any> {
    return this.drawingBehavior.exit(exitElement);
  }

  dragStart(i: number, nodes: Element[] | ArrayLike<Element>): void {
    this.dragBehavior.dragStart(this, i, nodes);
  }

  dragging(i: number, nodes: Element[] | ArrayLike<Element>): void {
    this.dragBehavior.dragging(this, i, nodes);
  }

  dragEnd(i: number, nodes: Element[] | ArrayLike<Element>): void {
    this.dragBehavior.dragEnd(this, i, nodes);
  }

  set color(color: string) {
    this.drawingBehavior.color = color;
  }

  get color(): string {
    return this.drawingBehavior.color;
  }
}
