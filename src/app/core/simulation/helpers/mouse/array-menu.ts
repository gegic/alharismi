import {SimulationQueue} from '../../structures/array/simulation-queue';
import {SimulationNode} from '../../basics/simulation-node';
import {Simulation} from '../../simulation';
import {MenuItem} from 'd3-context-menu';
import {SimulationStack} from '../../structures/array/simulation-stack';
import {SimulationArray} from '../../structures/array/simulation-array';
import {InsertionSort} from '../../structures/array/insertion-sort';
import {SelectionSort} from '../../structures/array/selection-sort';
import {BubbleSort} from '../../structures/array/bubble-sort';
import {MergeSort} from '../../structures/array/merge-sort';
import {QuickSort} from '../../structures/array/quick-sort';

export const arrayMenu = (simulation: Simulation): MenuItem[] => [
  {
    title: 'Set size',
    action: async (elm: SimulationArray) => {
      const newValue = await simulation.prompt('New size');

      let parsed = parseFloat(newValue);

      if (isNaN(parsed)) {
        parsed = 10;
      }
      elm.setCapacity(parsed);
    }
  },
  {
    title: 'Change name',
    action: async (elm: SimulationArray) => {
      elm.descriptor = await simulation.prompt('New name');
    }
  },
  {
    // divider
    divider: true
  },
  {
    title: 'Find',
    action: async (arr: SimulationArray) => {
      const newValue = await simulation.prompt('Which value to find');

      const parsed = parseFloat(newValue);

      if (isNaN(parsed)) {
        alert('Value invalid');
        return;
      }
      await arr.linearSearch(parsed);
    }
  },
  {
    title: 'Insert',
    action: async (arr: SimulationArray) => {
      const newValue = parseFloat(await simulation.prompt('Which value to insert'));
      const index = parseFloat(await simulation.prompt('Dje bate?'));
      if (isNaN(newValue) || isNaN(index)) {
        alert('Value invalid');
        return;
      }
      const node = new SimulationNode(newValue, -1, arr.x, arr.y - 200);
      simulation.nodeHandler.add(node);
      await arr.insertAt(node, index);
    }
  },
  {
    title: 'Delete',
    action: async (arr: SimulationArray) => {
      const index = parseFloat(await simulation.prompt('Which index would you like to remove?'));
      if (isNaN(index)) {
        alert('Value invalid');
        return;
      }
      await arr.deleteAt(index);
    }
  },
  {
    divider: true
  },
  {
    title: 'Sort',
    children: [
      {
        title: 'Insertion',
        action: async (arr: SimulationArray) => {
          arr.sorting = new InsertionSort();
          await arr.sort();
        }
      },
      {
        title: 'Selection',
        action: async (arr: SimulationArray) => {
          arr.sorting = new SelectionSort();
          await arr.sort();
        }
      },
      {
        title: 'Bubble',
        action: async (arr: SimulationArray) => {
          arr.sorting = new BubbleSort();
          await arr.sort();
        }
      },
      {
        title: 'Merge',
        action: async (arr: SimulationArray) => {
          arr.sorting = new MergeSort();
          await arr.sort();
        }
      },
      {
        title: 'Quick',
        action: async (arr: SimulationArray) => {
          arr.sorting = new QuickSort();
          await arr.sort();
        }
      }
    ]
  }
];
