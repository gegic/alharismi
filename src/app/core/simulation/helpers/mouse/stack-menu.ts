import {SimulationQueue} from '../../structures/array/simulation-queue';
import {SimulationNode} from '../../basics/simulation-node';
import {Simulation} from '../../simulation';
import {MenuItem} from 'd3-context-menu';
import {SimulationStack} from '../../structures/array/simulation-stack';

export const stackMenu = (simulation: Simulation): MenuItem[] => [

  {
    title: 'Change name',
    action: async (elm: SimulationStack) => {
      elm.descriptor = await simulation.prompt('New name');
    }
  },
  {
    // divider
    divider: true
  },
  {
    title: 'Push',
    action: async (stack: SimulationStack) => {
      const newValue = parseFloat(await simulation.prompt('Which value to insert'));
      if (isNaN(newValue)) {
        alert('Value invalid');
        return;
      }
      const node = new SimulationNode(newValue, -1, stack.x, stack.y - 200);
      simulation.nodeHandler.add(node);
      await stack.push(node);
    }
  },
  {
    title: 'Pop',
    action: async (stack: SimulationStack) => {

      await stack.pop();
    }
  }
];
