import {Selection} from 'd3-selection';
import * as d3 from 'd3';
import {SimulationNode} from '../basics/simulation-node';
import {defaultRadius} from '../../consts';
import {NodeHandler} from './node-handler';
import {PositionHelper} from '../helpers/position-helper';
import {ColorProvider} from '../providers/color-provider';
import {SimulationText} from '../basics/simulation-text';
import {DrawableHandler} from './drawable-handler';
import {SimulationArray} from '../structures/array/simulation-array';
import {BinarySearchTree} from '../structures/tree/binary-search-tree/binary-search-tree';
import {BstCell} from '../structures/tree/bst-cell';
import {SimulationLink} from '../basics/simulation-link';

export class SimulationLoop {
  nodeElements?: Selection<any, any, d3.BaseType, any>;
  bstCellElements?: Selection<any, any, d3.BaseType, any>;
  texts?: Selection<any, any, d3.BaseType, any>;
  links?: Selection<any, any, d3.BaseType, any>;
  arrows?: Selection<any, any, d3.BaseType, any>;
  arrayElements?: Selection<any, any, d3.BaseType, any>;

  force: d3.Simulation<any, any>;
  draggedNode?: SimulationNode;

  nodes: (SimulationNode | SimulationArray | BstCell)[] = [];

  drawableHandlers: DrawableHandler<SimulationNode | SimulationArray | BinarySearchTree>[] = [];

  setupForce(): void {
    this.force = d3.forceSimulation([])
      .force('charge',
        d3.forceManyBody()
          .strength(-200)
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
          .distance(100)
          .strength(.2)
      )
      .force(
        'collision',
        d3.forceCollide().radius((n: SimulationNode | BstCell) => n.radius)
      )
      .alphaTarget(.5)
      .on('tick', this.ticked(30));
  }

  ticked(interval: number): () => void {
    let then = Date.now();
    return () => {
      const now = Date.now();
      const elapsed = now - then;

      const fpsInterval = 1000 / interval;
      if (elapsed > fpsInterval) {
        then = now - (elapsed / fpsInterval);

        const svg = d3.select('svg');
        svg.lower();

        // if (window.camera) setTimeout(() => window.camera.reFocus(), 50)

        this.nodeElements = svg.selectAll('.node');
        this.arrayElements = svg.selectAll('.array');
        this.bstCellElements = svg.selectAll('.bst-cell');


        this.nodes = this.bstCellElements.data().concat(this.nodeElements.data().filter(d => !d.noCollision));
        this.force.nodes(this.nodes);

        this.links = svg.selectAll('.link');
        // @ts-ignore
        this.force.force('link').links(this.links);

        this.drawableHandlers.forEach(handler => handler.draw());

        this.nodeElements
          ?.attr('transform', (d: SimulationNode) => {
            return `translate(${d.x}, ${d.y})`;
          });

        this.arrayElements
          ?.attr('transform', d => `translate(${d.x}, ${d.y})`);

        this.bstCellElements
          ?.attr('transform', d => {
            return `translate(${d.x}, ${d.y})`;
          });

        this.links
          ?.attr('x1', (d: SimulationLink) => d.source.x)
          ?.attr('y1', (d: SimulationLink) => d.source.y)
          ?.attr('x2', (d: SimulationLink) => d.target.x)
          ?.attr('y2', (d: SimulationLink) => d.target.y);

      }
    };
  }

  repaint(): void {



    // this.texts = svg.selectAll('.circlenames, .circlevalues, .rootnames, .textnode, .buttontext, .textarea');
    // this.links = svg.selectAll('.default_link');
    // this.bstLinks = svg.selectAll('.BST_line');
    // this.arrows = svg.selectAll('.circlearrow');
  }

  setHandlers(...drawableHandlers: DrawableHandler<SimulationNode | SimulationArray | BinarySearchTree>[]): void {
    this.drawableHandlers = drawableHandlers;
  }
}
