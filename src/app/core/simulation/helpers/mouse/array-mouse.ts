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
import {SimulationStack} from '../../structures/array/simulation-stack';
import {stackMenu} from './stack-menu';
import {SimulationQueue} from '../../structures/array/simulation-queue';
import {queueMenu} from './queue-menu';
import {arrayMenu} from './array-menu';

export class ArrayMouse implements MouseHelper<SimulationArray> {

  simulation: Simulation;

  constructor(simulation: Simulation) {
    this.simulation = simulation;
  }

  contextMenu(d: SimulationArray, i: number, arrays: d3Element[] | ArrayLike<d3Element>): void {
    let menu: MenuItem[];
    if (d instanceof SimulationStack) {
      menu = stackMenu(this.simulation);
    } else if (d instanceof SimulationQueue) {
      menu = queueMenu(this.simulation);
    } else {
      menu = arrayMenu(this.simulation);
    }
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
