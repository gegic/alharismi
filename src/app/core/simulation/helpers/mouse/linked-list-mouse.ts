import {d3Element, MouseHelper} from './mouse-helper';
import {ArrayCell} from '../../structures/array/array-cell';
import {SimulationLoop} from '../../handlers/simulation-loop';
import contextMenu, {ContextMenuFn, MenuItem} from 'd3-context-menu';
import * as d3 from 'd3';
import {SimulationNode} from '../../basics/simulation-node';
import {Simulation} from '../../simulation';
import {BstCell} from '../../structures/tree/bst-cell';
import {BstCellMouse} from './bst-cell-mouse';
import {LinkedList} from '../../structures/tree/linked-list/linked-list';

export class LinkedListMouse implements MouseHelper<LinkedList> {

  simulation: Simulation;

  constructor(simulation: Simulation) {
    this.simulation = simulation;
  }

  contextMenu(d: LinkedList, i: number, trees: d3Element[] | ArrayLike<d3Element>): void {
    const menu = [
      {
        title: 'Insert',
        disabled: !d.isValid,
        action: async (heap: LinkedList) => {
          // const newValue = parseFloat(prompt('Which value to insert'));
          // if (isNaN(newValue)) {
          //   alert('Value invalid');
          //   return;
          // }
          // const lastCell = heap.getEmptyCell();
          // const node = new SimulationNode(newValue, -1, lastCell.x, lastCell.y - 150);
          // this.simulation.nodeHandler.add(node);
          // await heap.insert(node);
        }
      },
      {
        title: 'Delete',
        disabled: !d.isValid,
        action: async (heap: LinkedList) => {
          // const deleteValue = parseFloat(prompt('Which value to delete'));
          // if (isNaN(deleteValue)) {
          //   alert('Value invalid');
          //   return;
          // }
          //
          // await heap.delete(deleteValue);
        }
      },
      {
        title: 'Info log',
        action: async (elm: LinkedList) => {
          console.log(elm);
        }
      }
    ];

    contextMenu(menu)(d, i);
  }

  addMouseInteraction(element: d3.Selection<d3.BaseType, LinkedList, any, any>):
    d3.Selection<d3.BaseType, LinkedList, any, any> {
    element
      // .on('mouseover', (d: LinkedList, i: number, arrays: d3Element[] | ArrayLike<d3Element>) => this.mouseOver(d, i, arrays))
      // .on('mouseout', (d: LinkedList, i: number, arrays: d3Element[] | ArrayLike<d3Element>) => this.mouseOut(d, i, arrays))
      .on('contextmenu', ((d: LinkedList, i: number, trees: d3Element[] | ArrayLike<d3Element>) => this.contextMenu(d, i, trees)));
    return element;
  }
}
