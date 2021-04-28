import {d3Element, MouseBehavior} from './mouse-behavior';
import * as d3 from 'd3';
import {ArrayCell} from '../../structures/array/array-cell';
import {SimulationHandler} from '../../handlers/simulation-handler';

export class ArrayCellMouse implements MouseBehavior<ArrayCell> {

  simulationHandler: SimulationHandler;

  constructor(simulationHandler: SimulationHandler) {
    this.simulationHandler = simulationHandler;
  }

  mouseOver(d: ArrayCell, i: number, cells: d3Element[] | ArrayLike<d3Element>): void {
    d.isMouseOver = true;

    // if dragging node and cell not holding node, then attach it to array cell
    if (!this.simulationHandler.draggedNode) {
      return;
    }

    this.simulationHandler.draggedNode.hoveringGrid = d;

    d3.select(cells[i]).style('fill', 'gray');

    d.hoveringNode = this.simulationHandler.draggedNode;
    this.simulationHandler.draggedNode.fx = d.parent.x + d.x + d.width / 2;
    this.simulationHandler.draggedNode.fy = d.height / 2 + d.parent.y;

    // now check if array is valid and color it accordingly

  }

  mouseOut(d: ArrayCell, i: number, cells: d3Element[] | ArrayLike<d3Element>): void {
    d.isMouseOver = false;

    if (!this.simulationHandler.draggedNode) {
      return;
    }
    if (d.hoveringNode !== d.node) {
      d.hoveringNode = d.node;
    }
    else {
      d.hoveringNode = undefined;
    }

    if (!d.hoveringNode) {
      d3.select(cells[i]).style('fill', 'white');
    }


    this.simulationHandler.draggedNode.hoveringGrid = null;

  }


}
