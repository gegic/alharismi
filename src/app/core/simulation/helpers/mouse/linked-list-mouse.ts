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
        title: 'Prepend',
        disabled: !d.isValid,
        action: async (linkedList: LinkedList) => {
          const newValue = parseFloat(await this.simulation.prompt('Which value to prepend'));
          if (isNaN(newValue)) {
            alert('Value invalid');
            return;
          }
          const node = new SimulationNode(newValue, -1, linkedList.x, linkedList.y - 150);
          this.simulation.nodeHandler.add(node);
          await linkedList.prepend(node);
        }
      },
      {
        title: 'Append',
        disabled: !d.isValid,
        action: async (linkedList: LinkedList) => {
          const newValue = parseFloat(await this.simulation.prompt('Which value to append'));
          if (isNaN(newValue)) {
            alert('Value invalid');
            return;
          }
          const node = new SimulationNode(newValue, -1, linkedList.x, linkedList.y - 150);
          this.simulation.nodeHandler.add(node);
          await linkedList.append(node);
        }
      },
      {
        title: 'Insert',
        disabled: !d.isValid,
        action: async (linkedList: LinkedList) => {
          const newValue = parseFloat(await this.simulation.prompt('Which value to insert'));
          const index = parseFloat(await this.simulation.prompt('At which index to insert?'));

          if (isNaN(newValue) || isNaN(index)) {
            alert('Value invalid');
            return;
          }
          const node = new SimulationNode(newValue, -1, linkedList.x, linkedList.y - 150);
          this.simulation.nodeHandler.add(node);
          await linkedList.insert(node, index);
        }
      },
      {
        divider: true
      },
      {
        title: 'Pop first',
        disabled: d.getData().length <= 2,
        action: async (linkedList: LinkedList) => {
          await linkedList.popFirst();
        }
      },
      {
        title: 'Pop last',
        disabled: d.getData().length <= 2,
        action: async (linkedList: LinkedList) => {
          await linkedList.popLast();
        }
      },
      {
        title: 'Delete',
        disabled: d.getData().length <= 2,
        action: async (linkedList: LinkedList) => {
          const index = parseFloat(await this.simulation.prompt('From which index to delete'));
          if (isNaN(index)) {
            alert('Value invalid');
            return;
          }
          await linkedList.delete(index);
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

  addMouseInteraction(element: d3.Selection<d3.BaseType, LinkedList, any, any>): d3.Selection<d3.BaseType, LinkedList, any, any> {

    if (!this.simulation.interactable) {
      return element;
    }

    element
      // .on('mouseover', (d: LinkedList, i: number, arrays: d3Element[] | ArrayLike<d3Element>) => this.mouseOver(d, i, arrays))
      // .on('mouseout', (d: LinkedList, i: number, arrays: d3Element[] | ArrayLike<d3Element>) => this.mouseOut(d, i, arrays))
      .on('contextmenu', ((d: LinkedList, i: number, trees: d3Element[] | ArrayLike<d3Element>) => this.contextMenu(d, i, trees)));
    return element;
  }
}
