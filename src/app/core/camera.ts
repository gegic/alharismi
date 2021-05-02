import * as d3 from 'd3';
import {Selection} from 'd3-selection';

export class Camera {
  transitionDuration = 2000;
  zoom?: d3.ZoomBehavior<any, any>;

  canvas: Selection<any, any, any, any>;

  constructor(canvas: Selection<any, any, any, any>) {
    this.canvas = canvas;
  }

  setZoom(svg: Selection<any, any, any, any>): void {
    if (!this.zoom) {
      this.zoom = d3
        .zoom()
        .translateExtent([[-10000, -10000], [10000, 10000]])
        .scaleExtent([0.3, 3])
        .on('zoom', () => {
          // if (d3.event.sourceEvent) return

          const e = d3.event as d3.D3ZoomEvent<any, any>;
          if (!e) {
            return;
          }

          // const sourceEvent = e.sourceEvent as MouseEvent | KeyboardEvent;

          // @ts-ignore
          this.canvas.attr('transform', e.transform);

          // this.previousTransform = e.transform;
        });
    }
    svg.call(this.zoom);
  }
}
