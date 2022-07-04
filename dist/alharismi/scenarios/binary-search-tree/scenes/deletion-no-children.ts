import {Scene} from '../../../app/core/simulation/scene';
import {Simulation} from '../../../app/core/simulation/simulation';
import {Heap} from '../../../app/core/simulation/structures/tree/binary-tree/heap/heap';
import {BinarySearchTree} from '../../../app/core/simulation/structures/tree/binary-tree/binary-search-tree/binary-search-tree';
import {SimulationNode} from '../../../app/core/simulation/basics/simulation-node';
import {BstCell} from '../../../app/core/simulation/structures/tree/bst-cell';

export class DeletionNoChildren implements Scene {
  id = 2;
  isFirst: boolean;
  isLast: boolean;
  played: 'not_played' | 'playing' | 'played' | 'unplayable' = 'not_played';
  set: boolean;
  setupPath: string;

  toRemove = -1;
  bst: BinarySearchTree;
  async setup(simulation: Simulation): Promise<void> {
    const nodes = simulation.nodeHandler.generateNodes(8);

    simulation.nodeHandler.add(nodes);
    this.bst = simulation.objectFactory.create('bst', 0, 0) as BinarySearchTree;
    simulation.bstHandler.add(this.bst);

    for (const node of nodes) {
      await this.bst.insert(node, false);
    }

    const cellToRemove = this.getNodeWithoutChildren(this.bst);
    this.toRemove = cellToRemove.node.value;

  }

  async play(simulation: Simulation): Promise<void> {
    await this.bst.delete(this.toRemove);
  }

  private getNodeWithoutChildren(bst: BinarySearchTree): BstCell {
    let cell = bst.getRoot();

    while (!!bst.getLeftChild(cell).node || !!bst.getRightChild(cell).node) {
      const leftChild = bst.getLeftChild(cell);
      if (!!leftChild.node) {
        cell = leftChild;
        continue;
      }
      const rightChild = bst.getRightChild(cell);
      if (!!rightChild.node) {
        cell = rightChild;
      }
    }

    return cell;
  }

  content(): string {
    return `
  <h1 class="scene-title">Deletion - No children</h1>
  <p>
    It's quite complicated to delete an element from a binary search tree. There are
    three cases:
  </p>
  <ol>
    <li>
      <b><small>The node we're deleting</small> doesn't have any children (its children are empty leaves);</b>
    </li>
    <li>
      <small>The node we're deleting</small> has only one child (the other one is an empty leaf);
    </li>
    <li>
      <small>The node we're deleting</small> has two children.
    </li>
  </ol>
  <p>
    Now, let's see the first case and remove the node with value ${this.toRemove}.
  </p>
  `;
  }

  successContent(): string {
    return `
  <p>
    This case was quite simple, and the node containing ${this.toRemove} was simply deleted from
    the tree.
  </p>
    `;
  }

}
