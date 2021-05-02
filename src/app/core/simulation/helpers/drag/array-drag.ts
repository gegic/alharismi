import {DragHelper} from './drag-helper';
import {SimulationArray} from '../../structures/array/simulation-array';
import * as d3 from 'd3';

export class ArrayDrag implements DragHelper<SimulationArray> {

  dragStart(d: SimulationArray, i: number, arrays: Element[] | ArrayLike<Element>): void {
    d3.select(arrays[i]).style('cursor', 'grabbing');
  }

  dragging(d: SimulationArray, i: number, arrays: Element[] | ArrayLike<Element>): void {
    d.setTransform(d3.event.x, d3.event.y);
  }

  dragEnd(d: SimulationArray, i: number, arrays: Element[] | ArrayLike<Element>): void {
    d3.select(arrays[i]).style('cursor', null);
  }

  addDragInteraction(element: d3.Selection<d3.BaseType, SimulationArray, any, any>): d3.Selection<d3.BaseType, SimulationArray, any, any> {
    const drag = d3.drag<Element, SimulationArray, unknown>()
      .on('start', (d: SimulationArray, i: number, arrays: Element[] | ArrayLike<Element>) => this.dragStart(d, i, arrays))
      .on('drag', (d: SimulationArray, i: number, arrays: Element[] | ArrayLike<Element>) => this.dragging(d, i, arrays))
      .on('end', (d: SimulationArray, i: number, arrays: Element[] | ArrayLike<Element>) => this.dragEnd(d, i, arrays));

    element.call(drag);

    return element;
  }

}
