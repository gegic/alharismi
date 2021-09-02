import {Scene} from '../../../app/core/simulation/scene';
import {Simulation} from '../../../app/core/simulation/simulation';
import {Heap} from '../../../app/core/simulation/structures/tree/binary-tree/heap/heap';
import {BinarySearchTree} from '../../../app/core/simulation/structures/tree/binary-tree/binary-search-tree/binary-search-tree';
import {SimulationNode} from '../../../app/core/simulation/basics/simulation-node';

export class Insertion implements Scene {
  id = 2;
  isFirst: boolean;
  isLast: boolean;
  played: 'not_played' | 'playing' | 'played' | 'unplayable' = 'not_played';
  set: boolean;
  setupPath: string;

  toAdd = 2.31;
  bst: BinarySearchTree;
  async setup(simulation: Simulation): Promise<void> {
    const nodes = simulation.nodeHandler.generateNodes(8);

    simulation.nodeHandler.add(nodes);
    this.bst = simulation.objectFactory.create('bst', 0, 0) as BinarySearchTree;
    simulation.bstHandler.add(this.bst);

    for (const node of nodes) {
      await this.bst.insert(node, false);
    }

  }

  async play(simulation: Simulation): Promise<void> {
    const node = new SimulationNode(this.toAdd, -1, this.bst.x, this.bst.y - 200);
    simulation.nodeHandler.add(node);
    await this.bst.insert(node);
  }

  content(): string {
    return `
  <h1 class="scene-title">Insertion</h1>
  <p>
    Inserting a value in the correct position is similar to searching
    because we try to maintain the rule that a node's left subtree is lower
    than the node and the right subtree is higher than the node.
  </p>
  <p>
    Using that rule, after reaching a leaf, we place our new node on that position.
  </p>
  <p>
    So, let's add ${this.toAdd} to the tree.
  </p>
  `;
  }

  successContent(): string {
    return `
  <p>
    A node with value ${this.toAdd} was successfully placed on a leaf's position, and
    all the properties of the binary search tree still apply.
  </p>
    `;
  }

}
