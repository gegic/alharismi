import {Selection} from 'd3-selection';
import {SimulationArray} from '../structures/array/simulation-array';
import {DrawingHelper} from '../helpers/drawing/drawing-helper';
import {DragHelper} from '../helpers/drag/drag-helper';
import {MouseHelper} from '../helpers/mouse/mouse-helper';

export interface DrawableHandler<SimulationObject> {

  drawingHelper: DrawingHelper<SimulationObject>;
  dragHelper: DragHelper<SimulationObject>;
  mouseHelper: MouseHelper<SimulationObject>;

  data: SimulationObject[];

  canvas: Selection<any, any, any, any>;

  draw(): void;
}
