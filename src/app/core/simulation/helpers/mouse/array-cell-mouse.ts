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

    d.rx = 50;
    d.ry = 50;
    this.simulation.loop.draggedNode.hoveringGrid = d;

    d.hoveringNode = this.simulation.loop.draggedNode;
    this.simulation.loop.draggedNode.move(d.parent.x + d.x + d.width / 2, d.height / 2 + d.parent.y);

    // now check if array is valid and color it accordingly
  }

  mouseOut(d: ArrayCell, i: number, cells: d3Element[] | ArrayLike<d3Element>): void {

    d.isMouseOver = false;

    d.rx = 25;
    d.ry = 25;

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
    if (!this.simulation.interactable) {
      return element;
    }


    element
      .on('mouseover', (d: ArrayCell, i: number, cells: d3Element[] | ArrayLike<d3Element>) => this.mouseOver(d, i, cells))
      .on('mouseout', (d: ArrayCell, i: number, cells: d3Element[] | ArrayLike<d3Element>) => this.mouseOut(d, i, cells));

    return element;
  }
}
