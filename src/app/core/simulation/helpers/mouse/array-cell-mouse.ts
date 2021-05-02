import {d3Element, MouseHelper} from './mouse-helper';
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

  mouseOver(d: ArrayCell, i: number, cells: d3Element[] | ArrayLike<d3Element>): void {
    d.isMouseOver = true;

    // if dragging node and cell not holding node, then attach it to array cell
    if (!this.simulation.loop.draggedNode || !!d.node) {
      return;
    }

    d3.select(cells[i])
      .select('.array-cell-container')
      .transition()
      .duration(600)
      .ease(d3.easeExpOut)
      .attr('rx', 50)
      .attr('ry', 50);

    this.simulation.loop.draggedNode.hoveringGrid = d;

    d.hoveringNode = this.simulation.loop.draggedNode;
    this.simulation.loop.draggedNode.x = d.parent.x + d.x + d.width / 2;
    this.simulation.loop.draggedNode.y = d.height / 2 + d.parent.y;

    // now check if array is valid and color it accordingly
  }

  mouseOut(d: ArrayCell, i: number, cells: d3Element[] | ArrayLike<d3Element>): void {

    d.isMouseOver = false;

    d3.select(cells[i])
      .select('.array-cell-container')
      .transition()
      .duration(600)
      .ease(d3.easeExpOut)
      .attr('rx', 25)
      .attr('ry', 25);

    if (!this.simulation.loop.draggedNode || !!d.node) {
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
    element
      .on('mouseover', (d: ArrayCell, i: number, cells: d3Element[] | ArrayLike<d3Element>) => this.mouseOver(d, i, cells))
      .on('mouseout', (d: ArrayCell, i: number, cells: d3Element[] | ArrayLike<d3Element>) => this.mouseOut(d, i, cells));

    return element;
  }
}
