import {Scene} from '../../../app/core/simulation/scene';
import {Simulation} from '../../../app/core/simulation/simulation';
import {Heap} from '../../../app/core/simulation/structures/tree/binary-tree/heap/heap';
import {SimulationNode} from '../../../app/core/simulation/basics/simulation-node';
import {RedBlackTree} from '../../../app/core/simulation/structures/tree/binary-tree/red-black-tree/red-black-tree';

export class DeletionFirstCase implements Scene {
  id = 2;
  isFirst: boolean;
  isLast: boolean;
  played: 'not_played' | 'playing' | 'played' | 'unplayable' = 'not_played';
  set: boolean;
  setupPath: string;

  toDelete = 40;
  bst: RedBlackTree;
  async setup(simulation: Simulation): Promise<void> {

    const nodes = this.createNodes(simulation, [30, 10, 40, 20]);
    simulation.nodeHandler.add(nodes);

    this.bst = simulation.objectFactory.create('rb', 0, 0) as RedBlackTree;
    simulation.bstHandler.add(this.bst);

    for (const node of nodes) {
      await this.bst.insert(node, false);
    }
  }

  createNodes(simulation: Simulation, values: number[]): SimulationNode[] {
    const nodes: SimulationNode[] = [];
    for (const value of values) {
      nodes.push(simulation.objectFactory.create('node', 0, 0, value) as SimulationNode);
    }
    return nodes;
  }

  async play(simulation: Simulation): Promise<void> {
    await this.bst.delete(this.toDelete);
  }

  content(): string {
    return `
  <h1 class="scene-title">Deletion - first case</h1>

  <p>
    Deletion of a node from a red-black tree is quite similar to that of an ordinary
    binary search tree, with the exception that, if a black node is deleted, black depth
    property is violated and balance has to be restored.
  </p>
  <p>
    If the deleted node was colored black, then its sibling's subtree is checked, and thus
    three different cases are formed.
  </p>
  <p>
    The first case occurs when the deleted node's sibling is black and has a red child. In that
    situation, tri-node-restructuring is performed.
  </p>
  <p>
    After removing ${this.toDelete} from the tree on the right-hand side, the first case will occur.
  </p>
  `;
  }

  successContent(): string {
    return `
  <p>
    All the properties of red-black tree are restored now by performing tri-node-restructuring.
  </p>
  <small>
    Checking wasn't propagated up the tree.
  </small>
    `;
  }

}
