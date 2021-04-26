import {Selection} from 'd3-selection';

export interface DrawableHandler {
  canvas: Selection<any, any, any, any>;

  draw(): void;
}
