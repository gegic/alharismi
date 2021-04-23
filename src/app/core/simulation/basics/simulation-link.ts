import {SimulationLinkDatum, SimulationNodeDatum} from 'd3-force';
import {SimulationNode} from './simulation-node';
import {Drawable} from '../drawable';
import {Selection} from 'd3-selection';
import * as d3 from 'd3';

export class SimulationLink implements SimulationLinkDatum<SimulationNode>, Drawable {
  strokeWidth = 10;
  visible = true;
  z = -1;
  isSliceable = true;

  index: number | undefined;
  source: SimulationNode;
  target: SimulationNode;
  container: Selection<any, any, HTMLElement, any>;

  delete(): void {
    if (this.container) {
      this.container.remove();
    }
  }

  draw(canvas: Selection<any, any, HTMLElement, any>): void {
    if (this.container) {
      this.container.remove();
    }
    if (!this.visible) {
      return;
    }

    const that = this;

    this.container = canvas.append('g');

    this.container
      .append('line')
      .datum(this)
      .attr('stroke', '#999')
      .attr('class', 'default-link')
      .attr('stroke-width', this.strokeWidth)
      .attr('stroke-opacity', .6);

    // TODO
  }
}
