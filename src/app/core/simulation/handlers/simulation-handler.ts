import {Selection} from 'd3-selection';
import * as d3 from 'd3';
import {SimulationNode} from '../basics/simulation-node';
import {defaultRadius} from '../../consts';
import {NodeHandler} from './node-handler';
import {PositionHelper} from '../helpers/position-helper';
import {ColorHelper} from '../helpers/color-helper';
import {SimulationText} from '../basics/simulation-text';
import {DrawableHandler} from './drawable-handler';

export class SimulationHandler {
  nodes?: Selection<any, any, d3.BaseType, any>;
  texts?: Selection<any, any, d3.BaseType, any>;
  links?: Selection<any, any, d3.BaseType, any>;
  bstLinks?: Selection<any, any, d3.BaseType, any>;
  arrows?: Selection<any, any, d3.BaseType, any>;
  arrays?: Selection<any, any, d3.BaseType, any>;

  simulation: d3.Simulation<any, any>;
  draggedNode?: SimulationNode;

  drawableHandlers: DrawableHandler[] = [];

  setupSimulation(): void {
    this.simulation = d3.forceSimulation([])
      .force('charge',
        d3.forceManyBody()
          .strength(-300)
          .distanceMin(10)
      )
      .force('x',
        d3.forceX()
          .x((d: SimulationNode) => d.cx)
          .strength(0.15)
      )
      .force('y',
        d3.forceY()
          .y((d: SimulationNode) => d.cy)
          .strength(0.1)
      )
      .force(
        'link',
        d3.forceLink([])
          .distance(10)
          .strength(1)
      )
      .force(
        'collision',
        d3.forceCollide().radius(defaultRadius)
      )
      .alphaTarget(.5)
      .on('tick', this.ticked(60));
  }

  ticked(interval: number): () => void {
    let then = Date.now();
    return () => {
      const now = Date.now();
      const elapsed = now - then;

      const fpsInterval = 1000 / interval;
      if (elapsed > fpsInterval) {
        then = now - (elapsed / fpsInterval);
        this.nodes
          ?.attr('transform', d => `translate(${d.x}, ${d.y})`);

        this.arrays
          ?.attr('transform', d => `translate(${d.x}, ${d.y})`);

        // this.texts
        //   ?.attr('x', (d: SimulationText) => d.x)
        //   ?.attr('y', (d: SimulationText) => d.y);

        // this.links
        //   ?.attr('x1', (d: SimulationLink) => d.source.x)
        //   ?.attr('y1', (d: SimulationLink) => d.source.y)
        //   ?.attr('x2', (d: SimulationLink) => d.target.x)
        //   ?.attr('y2', (d: SimulationLink) => d.target.y);
        //
        // this.bstLinks
        //   ?.attr('x1', (d: SimulationLink) => d.source.x)
        //   ?.attr('y1', (d: SimulationLink) => d.source.y)
        //   ?.attr('x2', (d: SimulationLink) => d.target.x)
        //   ?.attr('y2', (d: SimulationLink) => d.target.y);
        //
        // this.arrows
        //   ?.attr('x1', (d: SimulationNode) => d.x)
        //   ?.attr('y1', (d: SimulationNode) => d.y - 150)
        //   ?.attr('x2', (d: SimulationNode) => d.x)
        //   ?.attr('y2', (d: SimulationNode) => d.y - 100);
        //
        // this.arrays
        //   ?.attr('x', (d: SimulationArray) => d.x)
        //   ?.attr('y', (d: SimulationArray) => d.y);
      }
    };
  }

  repaint(): void {

    this.drawableHandlers.forEach(handler => handler.draw());

    const svg = d3.select('svg');
    svg.lower();

    // if (window.camera) setTimeout(() => window.camera.reFocus(), 50)

    this.nodes = svg.selectAll('.node');
    this.arrays = svg.selectAll('.array');

    // this.texts = svg.selectAll('.circlenames, .circlevalues, .rootnames, .textnode, .buttontext, .textarea');
    // this.links = svg.selectAll('.default_link');
    // this.bstLinks = svg.selectAll('.BST_line');
    // this.arrows = svg.selectAll('.circlearrow');
  }

  setHandlers(...drawableHandlers: DrawableHandler[]): void {
    this.drawableHandlers = drawableHandlers;
  }
}
