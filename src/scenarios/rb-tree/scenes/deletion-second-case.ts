import {Scene} from '../../../app/core/simulation/scene';
import {Simulation} from '../../../app/core/simulation/simulation';
import {Heap} from '../../../app/core/simulation/structures/tree/binary-tree/heap/heap';
import {SimulationNode} from '../../../app/core/simulation/basics/simulation-node';
import {RedBlackTree} from '../../../app/core/simulation/structures/tree/binary-tree/red-black-tree/red-black-tree';

export class DeletionSecondCase implements Scene {
  id = 2;
  isFirst: boolean;
  isLast: boolean;
  played: 'not_played' | 'playing' | 'played' | 'unplayable' = 'not_played';
  set: boolean;
  setupPath: string;

  toDelete = 40;
  bst: RedBlackTree;
  async setup(simulation: Simulation): Promise<void> {

    const nodes = this.createNodes(simulation, [30, 10, 40, 5]);
    simulation.nodeHandler.add(nodes);

    this.bst = simulation.objectFactory.create('rb', 0, 0) as RedBlackTree;
    simulation.bstHandler.add(this.bst);

    for (const node of nodes) {
      await this.bst.insert(node, false);
    }

    const [deleted] = await this.bst.delete(5, false);
    simulation.nodeHandler.remove(deleted);
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
  <h1 class="scene-title">Deletion - second case</h1>

  <p>
    In the second case, sibling is colored black and both of its children are
    black, recoloring is performed so sibling becomes red and the deleted
    node's parent becomes black.
  </p>
  <p>
    If the deleted node's parent was red, checking is propagated up the tree.
  </p>
  <p>
    This case is demonstrated on the right-hand side by deletion of ${this.toDelete}
    from the tree.
  </p>
  `;
  }

  successContent(): string {
    return `
  <p>
    All the properties of red-black tree are restored now by performing tri-node-restructuring.
  </p>
  <small>
    In this case, since 30 was root and thus black, checking wasn't propagated up the tree.
  </small>
    `;
  }

}
