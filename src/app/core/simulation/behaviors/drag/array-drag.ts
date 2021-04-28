import {DragBehavior} from './drag-behavior';
import {SimulationArray} from '../../structures/array/simulation-array';
import * as d3 from 'd3';

export class ArrayDrag implements DragBehavior<SimulationArray> {

  dragStart(d: SimulationArray, i: number, arrays: Element[] | ArrayLike<Element>): void {
    d3.select(arrays[i]).style('cursor', 'grabbing');
  }

  dragging(d: SimulationArray, i: number, arrays: Element[] | ArrayLike<Element>): void {
    d.setTransform(d3.event.x, d3.event.y);
  }

  dragEnd(d: SimulationArray, i: number, arrays: Element[] | ArrayLike<Element>): void {
    d3.select(arrays[i]).style('cursor', null);
  }

}
