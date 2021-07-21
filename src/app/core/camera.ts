import * as d3 from 'd3';
import {Selection} from 'd3-selection';
import {BehaviorSubject} from 'rxjs';

export class Camera {
  transitionDuration = 2000;
  zoom?: d3.ZoomBehavior<any, any>;
  widthHeight: BehaviorSubject<[number, number]> = new BehaviorSubject([0, 0]);

  svg: Selection<any, any, any, any>;
  canvas: Selection<any, any, any, any>;

  constructor(svg: Selection<any, any, any, any>,
              canvas: Selection<any, any, any, any>,
              widthHeight: [number, number]) {
    this.svg = svg;
    this.canvas = canvas;
    this.widthHeight.next(widthHeight);
  }

  setZoom(): void {
    if (!this.zoom) {
      this.zoom = d3
        .zoom()
        .translateExtent([[-10000, -10000], [10000, 10000]])
        .scaleExtent([0.3, 3])
        .on('zoom', () => {

          const e = d3.event as d3.D3ZoomEvent<any, any>;
          if (!e) {
            return;
          }
          // @ts-ignore
          this.canvas.attr('transform', e.transform);
        });
    }

    this.svg.call(this.zoom);
  }

  focusSvg(): void {
    const [width, height] = this.widthHeight.getValue();
    this.svg
      .transition()
      .duration(this.transitionDuration)
      .call(
        this.zoom.transform,
        d3.zoomIdentity.translate(width / 2, height / 2).scale(.4)
      );
  }

  focus(element: d3.Selection<any, any, any, any>): void {
    const bbox = element.node().getBBox();
    const [width, height] = this.widthHeight.getValue();
    const midX = (2 * bbox.x + bbox.width) / 2;
    const midY = (2 * bbox.y + bbox.height) / 2;
    const scale = 0.9 / Math.max(bbox.width / width, bbox.height / height);
    const center = [width / 2 - scale * midX, height / 2 - scale * midY];
    console.log(bbox);
    console.log(scale);
    console.log(center);
    if (scale > 3) {
      console.log('DAVIDJU');
      console.log(center);
      console.log(scale);
      console.log(element);
      return;
    }
    this.svg
      .transition()
      .duration(this.transitionDuration)
      .call(
        this.zoom.transform,
        d3.zoomIdentity.translate(center[0], center[1]).scale(scale)
      );
  }
}
