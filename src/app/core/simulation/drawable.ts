import {Selection} from 'd3-selection';

export interface Drawable {
  draw(canvas: Selection<any, any, HTMLElement, any>): void;
}
