import {MouseHelper} from './mouse-helper';
import {ArrayCell} from '../../structures/array/array-cell';
import {SimulationLoop} from '../../handlers/simulation-loop';
import {MenuItem} from 'd3-context-menu';
import * as d3 from 'd3';
import {Simulation} from '../../simulation';

export class ArrayCellMouse implements MouseHelper<ArrayCell> {

  simulation: Simulation;

  constructor(simulation: Simulation) {
    this.simulation = simulation;
  }

  mouseOver(d: ArrayCell): void {
    d.isMouseOver = true;

    // if dragging node and cell not holding node, then attach it to array cell
    if (!this.simulation.loop.draggedNode) {
      return;
    }

    this.simulation.loop.draggedNode.hoveringGrid = d;

    d.hoveringNode = this.simulation.loop.draggedNode;
    this.simulation.loop.draggedNode.fx = d.parent.x + d.x + d.width / 2;
    this.simulation.loop.draggedNode.fy = d.height / 2 + d.parent.y;

    // now check if array is valid and color it accordingly
  }

  mouseOut(d: ArrayCell): void {
    d.isMouseOver = false;

    if (!this.simulation.loop.draggedNode) {
      return;
    }
    if (d.hoveringNode !== d.node) {
      d.hoveringNode = d.node;
    }
    else {
      d.hoveringNode = undefined;
    }

    this.simulation.loop.draggedNode.hoveringGrid = null;
  }

  addMouseInteraction(element: d3.Selection<d3.BaseType, ArrayCell, any, any>): d3.Selection<d3.BaseType, ArrayCell, any, any> {
    element.on('mouseover', d => this.mouseOver(d))
      .on('mouseout', d => this.mouseOut(d));

    return element;
  }
}
