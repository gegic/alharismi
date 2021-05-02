import {SimulationArray} from '../../structures/array/simulation-array';
import * as d3 from 'd3';

export interface DragHelper<SimulationObject> {
  addDragInteraction(element: d3.Selection<d3.BaseType, SimulationObject, any, any>):
    d3.Selection<d3.BaseType, SimulationObject, any, any>;
  dragStart?(d: SimulationObject, i: number, elements: Element[] | ArrayLike<Element>): void;
  dragging?(d: SimulationObject, i: number, elements: Element[] | ArrayLike<Element>): void;
  dragEnd?(d: SimulationObject, i: number, elements: Element[] | ArrayLike<Element>): void;
}
