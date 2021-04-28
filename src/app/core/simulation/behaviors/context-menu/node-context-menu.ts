import {ContextMenuBehavior} from './context-menu-behavior';
import {SimulationArray} from '../../structures/array/simulation-array';
import {MenuItem} from 'd3-context-menu';
import {SimulationNode} from '../../basics/simulation-node';

export class NodeContextMenu implements ContextMenuBehavior {
  getContextMenu(): MenuItem[] {
    return [
      {
        title: 'Set value',
        action: async (elm: SimulationNode) => {
          const newValue = prompt('Set value to');

          let parsed = parseFloat(newValue);

          if (isNaN(parsed)) {
            parsed = 69;
          }
          // var node_to_find = dataHandler.getAllFiguresOfClass("Circle").filter(d => d.value === number)[0]
          elm.value = parsed;
          elm.highlighted = true;
          await new Promise(r => setTimeout(r, 1000));
          elm.highlighted = false;
        }
      },
      {
        title: 'Delete',
        action: async (elm) => {
          elm.delete();
        }
      }
    ];

  }
}
