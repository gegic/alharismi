import {d3Element, MouseHelper} from './mouse-helper';
import {ArrayCell} from '../../structures/array/array-cell';
import {SimulationLoop} from '../../handlers/simulation-loop';
import contextMenu, {MenuItem} from 'd3-context-menu';
import * as d3 from 'd3';
import {SimulationArray} from '../../structures/array/simulation-array';
import {SimulationNode} from '../../basics/simulation-node';
import {Simulation} from '../../simulation';
import {BstCell} from '../../structures/tree/bst-cell';

export class ArrayMouse implements MouseHelper<SimulationArray> {

  simulation: Simulation;

  constructor(simulation: Simulation) {
    this.simulation = simulation;
  }

  // mouseOver(d: SimulationArray, i: number, arrays: d3Element[] | ArrayLike<d3Element>): void {
  //
  //   d3.select(arrays[i])
  //     .select('.array-bg')
  //     .style('stroke-width', 3)
  //     .transition()
  //     .duration(600)
  //     .ease(d3.easeLinear)
  //     .style('stroke-width', 10);
  // }
  //
  // mouseOut(d: SimulationArray, i: number, arrays: d3Element[] | ArrayLike<d3Element>): void {
  //   d3.select(arrays[i])
  //     .select('.array-bg')
  //     .transition()
  //     .duration(600)
  //     .ease(d3.easeLinear)
  //     .style('stroke-width', 3);
  //
  // }

  contextMenu(): MenuItem[] {
    return [
      {
        title: 'Set size',
        action: async (elm: SimulationArray) => {
          const newValue = prompt('New size');

          let parsed = parseFloat(newValue);

          if (isNaN(parsed)) {
            parsed = 10;
          }
          elm.setSize(parsed);
        }
      },
      {
        title: 'Reveal all',
        action: async (elm: SimulationArray) => {

          elm.data.filter((d: ArrayCell) => d.node).forEach((d: ArrayCell) => {
            d.node.isValueVisible = true;
          });
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
      // {
      //   title: 'Insert',
      //   action: async function (elm, d, i) {
      //     var number = prompt('Set value to')
      //     var arr = elm.parent
      //
      //     var numbers = getAllNumbersInString(number)
      //     var circles = circleManager.generateNodes(numbers.length, true, true, () => {}, true)
      //
      //     circles.forEach((d,i) =>
      //     {
      //       d.value = numbers[i]
      //       d.isNumberVisible = true; d.isRevealed = true;
      //     } )
      //     var queue = new CircleQueue(circles, arr)
      //     await asyncForEach(circles, async function (d) {
      //       await arr.addCircleToSortedArray(d)
      //       queue.pop()
      //       repaint()
      //     })
      //
      //   }
      // },
      {
        title: 'Find',
        action: async (arr: SimulationArray) => {
          const newValue = prompt('Which value to find');

          const parsed = parseFloat(newValue);

          if (isNaN(parsed)) {
            alert('Value invalid');
            return;
          }
          await arr.linearFindElement(parsed);
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
          // await arr.insertAt(, index);
        }
      }
    ];
  }

  addMouseInteraction(element: d3.Selection<d3.BaseType, SimulationArray, any, any>): d3.Selection<d3.BaseType, SimulationArray, any, any> {
    element
      // .on('mouseover', (d: SimulationArray, i: number, arrays: d3Element[] | ArrayLike<d3Element>) => this.mouseOver(d, i, arrays))
      // .on('mouseout', (d: SimulationArray, i: number, arrays: d3Element[] | ArrayLike<d3Element>) => this.mouseOut(d, i, arrays))
      .on('contextmenu', contextMenu(this.contextMenu()));
    return element;
  }
}
