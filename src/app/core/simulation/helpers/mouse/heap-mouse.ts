import {d3Element, MouseHelper} from './mouse-helper';
import {ArrayCell} from '../../structures/array/array-cell';
import {SimulationLoop} from '../../handlers/simulation-loop';
import contextMenu, {ContextMenuFn, MenuItem} from 'd3-context-menu';
import * as d3 from 'd3';
import {SimulationNode} from '../../basics/simulation-node';
import {Simulation} from '../../simulation';
import {BstCell} from '../../structures/tree/bst-cell';
import {BstCellMouse} from './bst-cell-mouse';
import {Heap} from '../../structures/tree/binary-tree/heap/heap';

export class HeapMouse implements MouseHelper<Heap> {

  simulation: Simulation;

  constructor(simulation: Simulation) {
    this.simulation = simulation;
  }

  contextMenu(d: Heap, i: number, trees: d3Element[] | ArrayLike<d3Element>): void {
    const menu = [
      {
        title: 'Change name',
        action: async (elm: Heap) => {
          elm.getRoot().setDefaultDescriptor(await this.simulation.prompt('New name'));
        }
      },
      {
        // divider
        divider: true
      },
      {
        title: 'Get minimum',
        disabled: !d.isValid,
        action: async (heap: Heap) => {
          // await heap.findMin();
        }
      },
      {
        title: 'Insert',
        disabled: !d.isValid,
        action: async (heap: Heap) => {
          const newValue = parseFloat(await this.simulation.prompt('Which value to insert'));
          if (isNaN(newValue)) {
            alert('Value invalid');
            return;
          }
          const lastCell = heap.getEmptyCell();
          const node = new SimulationNode(newValue, -1, lastCell.x, lastCell.y - 150);
          this.simulation.nodeHandler.add(node);
          await heap.insert(node);
        }
      },
      {
        title: 'Delete',
        disabled: !d.isValid,
        action: async (heap: Heap) => {
          const deleteValue = parseFloat(await this.simulation.prompt('Which value to delete'));
          if (isNaN(deleteValue)) {
            alert('Value invalid');
            return;
          }

          await heap.delete(deleteValue);
        }
      },
      {
        title: 'Delete min',
        disabled: !d.isValid,
        action: async (heap: Heap) => {
          await heap.deleteMin();
        }
      },
      {
        title: 'Info log',
        action: async (elm: Heap) => {
          console.log(elm);
        }
      }
    ];

    // if (!d.isValid) {
    //   menu.push(
    //     {
    //       divider: true
    //     },
    //     {
    //       title: 'Fix tree',
    //       action: async (heap: Heap) => {
    //         await heap.fix();
    //       }
    //     }
    //   );
    // }

    contextMenu(menu)(d, i);
  }

  addMouseInteraction(element: d3.Selection<d3.BaseType, Heap, any, any>): d3.Selection<d3.BaseType, Heap, any, any> {

    if (!this.simulation.interactable) {
      return element;
    }

    element
      // .on('mouseover', (d: Heap, i: number, arrays: d3Element[] | ArrayLike<d3Element>) => this.mouseOver(d, i, arrays))
      // .on('mouseout', (d: Heap, i: number, arrays: d3Element[] | ArrayLike<d3Element>) => this.mouseOut(d, i, arrays))
      .on('contextmenu', ((d: Heap, i: number, trees: d3Element[] | ArrayLike<d3Element>) => this.contextMenu(d, i, trees)));
    return element;
  }
}
