import {Simulation} from '../../simulation';
import {MouseHelper} from './mouse-helper';
import * as d3 from 'd3';
import {SimulationNode} from '../../basics/simulation-node';
import {RedBlackTree} from '../../structures/tree/binary-tree/red-black-tree/red-black-tree';
import contextMenu from 'd3-context-menu';
import {AvlTree} from '../../structures/tree/binary-tree/avl-tree/avl-tree';
import {BinarySearchTree} from '../../structures/tree/binary-tree/binary-search-tree/binary-search-tree';
import {SimulationArray} from '../../structures/array/simulation-array';
import {SimulationStack} from '../../structures/array/simulation-stack';
import {SimulationQueue} from '../../structures/array/simulation-queue';
export class SvgMouse implements MouseHelper<SVGElement> {

  simulation: Simulation;

  constructor(simulation: Simulation) {
    this.simulation = simulation;
  }

  contextMenu(): void {
    const x = d3.event.x;
    const y = d3.event.y;

    const menu = [
      {
        title: 'Node',
        action: async () => {
          const newValue = await this.simulation.prompt('Value?');
          const parsed = parseFloat(newValue);

          if (isNaN(parsed)) {
            return;
          }
          const node = new SimulationNode(parsed, -1, x, y);
          this.simulation.nodeHandler.add(node);
        }
      },
      {
        title: 'Array',
        action: async () => {
          const size = await this.simulation.prompt('Size?');

          const parsed = parseFloat(size);
          if (isNaN(parsed)) {
            return;
          }
          const arr = this.simulation.objectFactory.create('array', x, y, parsed) as SimulationArray;
          this.simulation.arrayHandler.add(arr);
        }
      },
      {
        title: 'Stack',
        action: async () => {
          const size = await this.simulation.prompt('Size?');
          const parsed = parseFloat(size);
          if (isNaN(parsed)) {
            return;
          }
          const stack = this.simulation.objectFactory.create('stack', x, y, parsed) as SimulationStack;
          stack.descriptor = `stack ${this.simulation.arrayHandler.maxId}`;
          this.simulation.arrayHandler.add(stack);
        }
      },
      {
        title: 'Queue',
        action: async () => {
          const size = await this.simulation.prompt('Size?');

          const parsed = parseFloat(size);
          if (isNaN(parsed)) {
            return;
          }
          const queue = this.simulation.objectFactory.create('queue', x, y, parsed) as SimulationQueue;
          queue.descriptor = `queue ${this.simulation.arrayHandler.maxId}`;

          this.simulation.arrayHandler.add(queue);
        }
      },
      {
        title: 'Binary search tree',
        action: async () => {
          const bst = this.simulation.objectFactory.create('bst', x, y) as BinarySearchTree;
          this.simulation.bstHandler.add(bst);
        }
      },
      {
        title: 'Red-black tree',
        action: async () => {
          const rbTree = this.simulation.objectFactory.create('rb', x, y) as RedBlackTree;
          this.simulation.bstHandler.add(rbTree);
        }
      },
      {
        title: 'AVL tree',
        action: async () => {
          const avlTree = this.simulation.objectFactory.create('avl', x, y) as AvlTree;
          this.simulation.bstHandler.add(avlTree);
        }
      }
    ];
    if (!this.simulation.interactable) {
      return;
    }

    contextMenu(menu)(undefined, undefined);
  }

  addMouseInteraction(element: d3.Selection<d3.BaseType, any, any, any>): d3.Selection<d3.BaseType, any, any, any> {
    if (!this.simulation.interactable) {
      return element;
    }

    element
      .on('contextmenu', () => this.contextMenu());
    return element;
  }
}
