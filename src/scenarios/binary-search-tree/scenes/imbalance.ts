import {Scene} from '../../../app/core/simulation/scene';
import {Simulation} from '../../../app/core/simulation/simulation';
import {Heap} from '../../../app/core/simulation/structures/tree/binary-tree/heap/heap';
import {BinarySearchTree} from '../../../app/core/simulation/structures/tree/binary-tree/binary-search-tree/binary-search-tree';

export class Imbalance implements Scene {
  id = 2;
  isFirst: boolean;
  isLast: boolean;
  played: 'not_played' | 'playing' | 'played' | 'unplayable' = 'not_played';
  set: boolean;
  setupPath: string;

  searchValue = -1;
  rootValue = -1;
  rightOrLeft = 'left';
  bst: BinarySearchTree;
  async setup(simulation: Simulation): Promise<void> {
    const nodes = simulation.nodeHandler.generateNodes(8);
    nodes.sort((a, b) => a.value > b.value ? 1 : a.value === b.value ? 0 : -1);

    simulation.nodeHandler.add(nodes);
    this.bst = simulation.objectFactory.create('bst', 0, 0) as BinarySearchTree;
    simulation.bstHandler.add(this.bst);

    for (const node of nodes) {
      await this.bst.insert(node, false);
    }

    this.searchValue = nodes[6].value;

  }

  async play(simulation: Simulation): Promise<void> {
    await this.bst.find(this.searchValue);
  }

  content(): string {
    return `
  <h1 class="scene-title">Searching - imbalance</h1>
  <p>
    There is a chance that we might insert nodes in an increasing or decreasing order.
  </p>
  <p>
    Then, our binary search tree will look like it looks on the right side.
  </p>
  <p>
    Now, finding ${this.searchValue} is just like searching for that same value in a linked list.
  </p>
  <small>This tree leans towards the right side and it's completely unbalanced.
  If the nodes were evenly spread, this tree would have been balanced</small>
  `;
  }

  successContent(): string {
    return `
  <p>
    While searching for ${this.searchValue}, our only option was to go down through right children, and
    after visiting almost each node, we have found ${this.searchValue}.
  </p>
    `;
  }

}
