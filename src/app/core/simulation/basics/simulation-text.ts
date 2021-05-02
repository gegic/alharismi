import * as d3 from 'd3';
import {Selection} from 'd3-selection';

export class SimulationText {

  text: string;
  x: number;
  y: number;
  z: number;
  fontSize: number;
  textContainer: Selection<any, any, HTMLElement, undefined>;
  textElement: Selection<any, any, HTMLElement, undefined>;
  opacity = .5;
  svg: Selection<any, any, HTMLElement, any>;

  constructor(text, x, y, fontSize = 20) {
    this.text = text;
    this.x = x;
    this.y = y;
    this.z = 1;
    this.fontSize = fontSize;
    this.svg = d3.select('svg');
  }

  delete(): void {
    if (this.textContainer)
    {
      this.textContainer.remove();
    }
  }

  draw(): void {
    if (this.textContainer) {
      this.textContainer.remove();
    }

    this.textContainer = this.svg.append('g');
    this.textElement = this.textContainer
      .append('text')
      .datum(this)
      .attr('class', 'textnode')
      .style('opacity', this.opacity)
      .text(this.text);

    this.textElement
      .attr('font-size', this.fontSize)
      .attr('font-family', 'monaco')
      .attr('dx', -5) // positions text towards the left of the center of the circle
      .attr('dy', 4)
      .style('text-anchor', 'middle');
  }


}
