import {DragHelper} from './drag-helper';
import * as d3 from 'd3';
import {Selection} from 'd3-selection';
import {ArrayCell} from '../../structures/array/array-cell';
import {SimulationArray} from '../../structures/array/simulation-array';
import {Simulation} from '../../simulation';
import {BstCell} from '../../structures/tree/bst-cell';

export class BstCellDrag implements DragHelper<BstCell> {

  simulation: Simulation;
  previouslyHoveredPlaceholders: Selection<any, any, any, any>[] = [];

  constructor(simulation: Simulation) {
    this.simulation = simulation;
  }

  dragStart(d: BstCell, i: number, cells: Element[] | ArrayLike<Element>): void {

    d.fixedMove(d3.event.x, d3.event.y);
    d3.select(cells[i]).style('cursor', 'grabbing');
    d3.select(cells[i]).raise();
  }

  dragging(d: BstCell, i: number, cells: Element[] | ArrayLike<Element>): void {

    d.fixedMove(d3.event.x, d3.event.y);

  }

  dragEnd(d: BstCell, i: number, cells: Element[] | ArrayLike<Element>): void {

    d.fx = undefined;
    d.fy = undefined;
    d.tree.moveCell(d, d3.event.x, d3.event.y);


    d3.select(cells[i]).style('cursor', null);

  }

  addDragInteraction(element: d3.Selection<d3.BaseType, BstCell, any, any>): d3.Selection<d3.BaseType, BstCell, any, any> {
    const drag = d3.drag<Element, BstCell, unknown>()
      .on('start', (d: BstCell, i: number, cells: Element[] | ArrayLike<Element>) => this.dragStart(d, i, cells))
      .on('drag', (d: BstCell, i: number, cells: Element[] | ArrayLike<Element>) => this.dragging(d, i, cells))
      .on('end', (d: BstCell, i: number, cells: Element[] | ArrayLike<Element>) => this.dragEnd(d, i, cells));

    element.call(drag);

    return element;
  }

}
