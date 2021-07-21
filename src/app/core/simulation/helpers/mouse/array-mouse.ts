import {d3Element, MouseHelper} from './mouse-helper';
import {ArrayCell} from '../../structures/array/array-cell';
import {SimulationLoop} from '../../handlers/simulation-loop';
import contextMenu, {ContextMenuFn, MenuItem} from 'd3-context-menu';
import * as d3 from 'd3';
import {SimulationArray} from '../../structures/array/simulation-array';
import {SimulationNode} from '../../basics/simulation-node';
import {Simulation} from '../../simulation';
import {BstCell} from '../../structures/tree/bst-cell';
import {BinarySearchTree} from '../../structures/tree/binary-tree/binary-search-tree/binary-search-tree';
import {InsertionSort} from '../../structures/array/insertion-sort';
import {SelectionSort} from '../../structures/array/selection-sort';
import {BubbleSort} from '../../structures/array/bubble-sort';
import {MergeSort} from '../../structures/array/merge-sort';
import {QuickSort} from '../../structures/array/quick-sort';

export class ArrayMouse implements MouseHelper<SimulationArray> {

  simulation: Simulation;

  constructor(simulation: Simulation) {
    this.simulation = simulation;
  }

  contextMenu(d: SimulationArray, i: number, arrays: d3Element[] | ArrayLike<d3Element>): void {
    const menu = [
      {
        title: 'Set size',
        action: async (elm: SimulationArray) => {
          const newValue = prompt('New size');

          let parsed = parseFloat(newValue);

          if (isNaN(parsed)) {
            parsed = 10;
          }
          elm.setCapacity(parsed);
        }
      },
      {
        title: 'Change name',
        action: async (elm: SimulationArray) => {
          elm.descriptor = prompt('New name');
        }
      },
      // {
      //   title: 'Fill array',
      //   action: async function (elm, d, i) {

      //     elm.parent.fillArray()
      //     repaint()
      //   }
      // },
      {
        // divider
        divider: true
      },
      {
        title: 'Find',
        action: async (arr: SimulationArray) => {
          const newValue = prompt('Which value to find');

          const parsed = parseFloat(newValue);

          if (isNaN(parsed)) {
            alert('Value invalid');
            return;
          }
          await arr.linearSearch(parsed);
        }
      },
      {
        title: 'Insert',
        action: async (arr: SimulationArray) => {
          const newValue = parseFloat(prompt('Which value to insert'));
          const index = parseFloat(prompt('Dje bate?'));
          if (isNaN(newValue) || isNaN(index)) {
            alert('Value invalid');
            return;
          }
          const node = new SimulationNode(newValue, -1, arr.x, arr.y - 200);
          this.simulation.nodeHandler.add(node);
          await arr.insertAt(node, index);
        }
      },
      {
        title: 'Delete',
        action: async (arr: SimulationArray) => {
          const index = parseFloat(prompt('Which index would you like to remove?'));
          if (isNaN(index)) {
            alert('Value invalid');
            return;
          }
          await arr.deleteAt(index);
        }
      },
      {
        divider: true
      },
      {
        title: 'Sort',
        children: [
          {
            title: 'Insertion',
            action: async (arr: SimulationArray) => {
              arr.sorting = new InsertionSort();
              await arr.sort();
            }
          },
          {
            title: 'Selection',
            action: async (arr: SimulationArray) => {
              arr.sorting = new SelectionSort();
              await arr.sort();
            }
          },
          {
            title: 'Bubble',
            action: async (arr: SimulationArray) => {
              arr.sorting = new BubbleSort();
              await arr.sort();
            }
          },
          {
            title: 'Merge',
            action: async (arr: SimulationArray) => {
              arr.sorting = new MergeSort();
              await arr.sort();
            }
          },
          {
            title: 'Quick',
            action: async (arr: SimulationArray) => {
              arr.sorting = new QuickSort();
              await arr.sort();
            }
          }
        ]
      }
    ];

    contextMenu(menu)(d, i);
  }

  addMouseInteraction(element: d3.Selection<d3.BaseType, SimulationArray, any, any>): d3.Selection<d3.BaseType, SimulationArray, any, any> {
    if (!this.simulation.interactable) {
      return element;
    }


    element
      // .on('mouseover', (d: SimulationArray, i: number, arrays: d3Element[] | ArrayLike<d3Element>) => this.mouseOver(d, i, arrays))
      // .on('mouseout', (d: SimulationArray, i: number, arrays: d3Element[] | ArrayLike<d3Element>) => this.mouseOut(d, i, arrays))
      .on('contextmenu', (d: SimulationArray, i: number, arrays: d3Element[] | ArrayLike<d3Element>) => this.contextMenu(d, i, arrays));
    return element;
  }
}
