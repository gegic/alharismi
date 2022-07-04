import {Scene} from '../../../app/core/simulation/scene';
import {Simulation} from '../../../app/core/simulation/simulation';
import {Heap} from '../../../app/core/simulation/structures/tree/binary-tree/heap/heap';
import {BinarySearchTree} from '../../../app/core/simulation/structures/tree/binary-tree/binary-search-tree/binary-search-tree';
import {SimulationNode} from '../../../app/core/simulation/basics/simulation-node';
import {BstCell} from '../../../app/core/simulation/structures/tree/bst-cell';

export class DeletionTwoChildren implements Scene {
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

    const medianIndex = Math.floor(nodes.length / 2);
    const medianNode = nodes[medianIndex];
    nodes.splice(medianIndex, 1);
    simulation.nodeHandler.add(medianNode);

    simulation.nodeHandler.add(nodes);

    this.bst = simulation.objectFactory.create('bst', 0, 0) as BinarySearchTree;
    simulation.bstHandler.add(this.bst);

    await this.bst.insert(medianNode, false);
    for (const node of nodes) {
      await this.bst.insert(node, false);
    }

    this.toRemove = medianNode.value;

  }

  async play(simulation: Simulation): Promise<void> {
    await this.bst.delete(this.toRemove);
  }

  content(): string {
    return `
  <h1 class="scene-title">Deletion - Two children</h1>
  <p>
    It's quite complicated to delete an element from a binary search tree. There are
    three cases:
  </p>
  <ol>
    <li>
      <small>The node we're deleting</small> doesn't have any children (its children are empty leaves);
    </li>
    <li>
      <small>The node we're deleting</small> has only one child (the other one is an empty leaf);
    </li>
    <li>
      <b><small>The node we're deleting</small> has two children.</b>
    </li>
  </ol>
  <p>
    Now, let's see the third case and remove the node with value ${this.toRemove}, which is a root node.
  </p>
  `;
  }

  successContent(): string {
    return `
  <p>
    This case was the most complicated. Firstly, we had to find the right-most descendant in the left subtree
    of this node, that descendant is the closest node with a lower value than the node we intend to delete.
  </p>
  <p>
    Now, we swap the acquired descendant and <em>target</em> node. Since descendant was the rightmost node in a subtree,
    it is obvious that it had one child at most, so we employ the tactics used for either the first or the second case.
  </p>
    `;
  }

}
