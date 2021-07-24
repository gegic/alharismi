import {Simulation} from '../../simulation';
import {MouseHelper} from './mouse-helper';
import * as d3 from 'd3';
import {SimulationNode} from '../../basics/simulation-node';
import {RedBlackTree} from '../../structures/tree/binary-tree/red-black-tree/red-black-tree';
import contextMenu from 'd3-context-menu';
import {AvlTree} from '../../structures/tree/binary-tree/avl-tree/avl-tree';
import {BinarySearchTree} from '../../structures/tree/binary-tree/binary-search-tree/binary-search-tree';
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
          const newValue = prompt('Value?');

          let parsed = parseFloat(newValue);

          if (isNaN(parsed)) {
            parsed = 10;
          }
          const node = new SimulationNode(parsed, -1, x, y);
          this.simulation.nodeHandler.add(node);
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
      },
      // // {
      // //   title: 'Fill array',
      // //   action: async function (elm, d, i) {
      //
      // //     elm.parent.fillArray()
      // //     repaint()
      // //   }
      // // },
      // {
      //   // divider
      //   divider: true
      // },
      // {
      //   title: 'Find',
      //   action: async (arr: SimulationArray) => {
      //     const newValue = prompt('Which value to find');
      //
      //     const parsed = parseFloat(newValue);
      //
      //     if (isNaN(parsed)) {
      //       alert('Value invalid');
      //       return;
      //     }
      //     await arr.linearSearch(parsed);
      //   }
      // },
      // {
      //   title: 'Insert',
      //   action: async (arr: SimulationArray) => {
      //     const newValue = parseFloat(prompt('Which value to insert'));
      //     const index = parseFloat(prompt('Dje bate?'));
      //     if (isNaN(newValue) || isNaN(index)) {
      //       alert('Value invalid');
      //       return;
      //     }
      //     const node = new SimulationNode(newValue, -1, arr.x, arr.y - 200);
      //     this.simulation.nodeHandler.add(node);
      //     await arr.insertAt(node, index);
      //   }
      // },
      // {
      //   title: 'Delete',
      //   action: async (arr: SimulationArray) => {
      //     const index = parseFloat(prompt('Which index would you like to remove?'));
      //     if (isNaN(index)) {
      //       alert('Value invalid');
      //       return;
      //     }
      //     await arr.deleteAt(index);
      //   }
      // },
      // {
      //   divider: true
      // },
      // {
      //   title: 'Sort',
      //   children: [
      //     {
      //       title: 'Insertion',
      //       action: async (arr: SimulationArray) => {
      //         arr.sorting = new InsertionSort();
      //         await arr.sort();
      //       }
      //     },
      //     {
      //       title: 'Selection',
      //       action: async (arr: SimulationArray) => {
      //         arr.sorting = new SelectionSort();
      //         await arr.sort();
      //       }
      //     },
      //     {
      //       title: 'Bubble',
      //       action: async (arr: SimulationArray) => {
      //         arr.sorting = new BubbleSort();
      //         await arr.sort();
      //       }
      //     },
      //     {
      //       title: 'Merge',
      //       action: async (arr: SimulationArray) => {
      //         arr.sorting = new MergeSort();
      //         await arr.sort();
      //       }
      //     },
      //     {
      //       title: 'Quick',
      //       action: async (arr: SimulationArray) => {
      //         arr.sorting = new QuickSort();
      //         await arr.sort();
      //       }
      //     }
      //   ]
      // }
    ];

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
