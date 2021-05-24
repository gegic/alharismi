import {d3Element, MouseHelper} from './mouse-helper';
import {ArrayCell} from '../../structures/array/array-cell';
import {SimulationLoop} from '../../handlers/simulation-loop';
import contextMenu, {ContextMenuFn, MenuItem} from 'd3-context-menu';
import * as d3 from 'd3';
import {SimulationNode} from '../../basics/simulation-node';
import {Simulation} from '../../simulation';
import {BstCell} from '../../structures/tree/bst-cell';
import {BinarySearchTree} from '../../structures/tree/binary-tree/binary-search-tree/binary-search-tree';
import {BstCellMouse} from './bst-cell-mouse';

export class BstMouse implements MouseHelper<BinarySearchTree> {

  simulation: Simulation;

  constructor(simulation: Simulation) {
    this.simulation = simulation;
  }

  contextMenu(d: BinarySearchTree, i: number, trees: d3Element[] | ArrayLike<d3Element>): void {
    const menu = [
      {
        title: 'Change name',
        action: async (elm: BinarySearchTree) => {
          elm.getData()[0].descriptor = prompt('New name');
        }
      },
      {
        // divider
        divider: true
      },
      {
        title: 'Find',
        disabled: !d.isValid,
        action: async (bst: BinarySearchTree) => {
          const newValue = prompt('Which value to find');

          const parsed = parseFloat(newValue);

          if (isNaN(parsed)) {
            alert('Value invalid');
            return;
          }
          await bst.find(parsed);
        }
      },
      {
        title: 'Insert',
        disabled: !d.isValid,
        action: async (bst: BinarySearchTree) => {
          const newValue = parseFloat(prompt('Which value to insert'));
          if (isNaN(newValue)) {
            alert('Value invalid');
            return;
          }
          const node = new SimulationNode(newValue, -1, bst.x, bst.y - 150);
          this.simulation.nodeHandler.add(node);
          await bst.insert(node);
        }
      },
      {
        title: 'Delete',
        disabled: !d.isValid,
        action: async (bst: BinarySearchTree) => {
          const deleteValue = parseFloat(prompt('Which value to delete'));
          if (isNaN(deleteValue)) {
            alert('Value invalid');
            return;
          }

          await bst.delete(deleteValue);
        }
      },
      {
        title: 'Info log',
        action: async (elm: BinarySearchTree) => {
          console.log(elm);
        }
      }
    ];

    if (!d.isValid) {
      menu.push(
        {
          divider: true
        },
        {
          title: 'Fix tree',
          action: async (bst: BinarySearchTree) => {
            await bst.fix();
          }
        }
      );
    }

    contextMenu(menu)(d, i);
  }

  addMouseInteraction(element: d3.Selection<d3.BaseType, BinarySearchTree, any, any>):
    d3.Selection<d3.BaseType, BinarySearchTree, any, any> {
    element
      // .on('mouseover', (d: BinarySearchTree, i: number, arrays: d3Element[] | ArrayLike<d3Element>) => this.mouseOver(d, i, arrays))
      // .on('mouseout', (d: BinarySearchTree, i: number, arrays: d3Element[] | ArrayLike<d3Element>) => this.mouseOut(d, i, arrays))
      .on('contextmenu', ((d: BinarySearchTree, i: number, trees: d3Element[] | ArrayLike<d3Element>) => this.contextMenu(d, i, trees)));
    return element;
  }
}
