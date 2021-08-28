import {SimulationQueue} from '../../structures/array/simulation-queue';
import {SimulationNode} from '../../basics/simulation-node';
import {Simulation} from '../../simulation';
import {MenuItem} from 'd3-context-menu';

export const queueMenu = (simulation: Simulation): MenuItem[] => [
  {
    title: 'Change name',
    action: async (elm: SimulationQueue) => {
      elm.descriptor = await simulation.prompt('New name');
    }
  },
  {
    // divider
    divider: true
  },
  {
    title: 'Enqueue',
    action: async (queue: SimulationQueue) => {
      const newValue = parseFloat(await simulation.prompt('Which value to enqueue'));
      if (isNaN(newValue)) {
        alert('Value invalid');
        return;
      }
      const node = new SimulationNode(newValue, -1, queue.x, queue.y - 200);
      simulation.nodeHandler.add(node);
      await queue.enqueue(node);
    }
  },
  {
    title: 'Dequeue',
    action: async (queue: SimulationQueue) => {

      await queue.dequeue();
    }
  }
];
