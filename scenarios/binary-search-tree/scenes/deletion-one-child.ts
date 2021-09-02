import {Scene} from '../../../app/core/simulation/scene';
import {Simulation} from '../../../app/core/simulation/simulation';
import {Heap} from '../../../app/core/simulation/structures/tree/binary-tree/heap/heap';
import {BinarySearchTree} from '../../../app/core/simulation/structures/tree/binary-tree/binary-search-tree/binary-search-tree';
import {SimulationNode} from '../../../app/core/simulation/basics/simulation-node';
import {BstCell} from '../../../app/core/simulation/structures/tree/bst-cell';

export class DeletionOneChild implements Scene {
  id = 5;
  isFirst: boolean;
  isLast: boolean;
  played: 'not_played' | 'playing' | 'played' | 'unplayable' = 'not_played';
  set: boolean;
  setupPath: string;

  toRemove = -1;
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

    this.toRemove = nodes[3].value;

  }

  async play(simulation: Simulation): Promise<void> {
    await this.bst.delete(this.toRemove);
  }

  content(): string {
    return `
  <h1 class="scene-title">Deletion - One child</h1>
  <p>
    It's quite complicated to delete an element from a binary search tree. There are
    three cases:
  </p>
  <ol>
    <li>
      <small>The node we're deleting</small> doesn't have any children (its children are empty leaves);
    </li>
    <li>
      <b><small>The node we're deleting</small> has only one child (the other one is an empty leaf);</b>
    </li>
    <li>
      <small>The node we're deleting</small> has two children.
    </li>
  </ol>
  <p>
    Now, let's see the second case and remove the node with value ${this.toRemove}.
  </p>
  `;
  }

  successContent(): string {
    return `
  <p>
    This case was a little bit more complicated than the previous one. Here, the node was deleted and
    and its child took the node's place, that is parent of the <em>target</em> node now has child
    of the <em>target</em> node set as its own child.
  </p>
    `;
  }

}
