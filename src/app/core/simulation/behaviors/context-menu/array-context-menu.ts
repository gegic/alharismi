import {ContextMenuBehavior} from './context-menu-behavior';
import {SimulationArray} from '../../structures/array/simulation-array';
import {MenuItem} from 'd3-context-menu';
import {ArrayCell} from '../../structures/array/array-cell';

export class ArrayContextMenu implements ContextMenuBehavior {
  getContextMenu(): MenuItem[] {
    return [
      {
        title: 'Set size',
        action: async (elm: SimulationArray) => {
          const newValue = prompt('New size');

          let parsed = parseFloat(newValue);

          if (isNaN(parsed)) {
            parsed = 10;
          }
          elm.setLength(parsed);
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
      }
    ];

  }
}
