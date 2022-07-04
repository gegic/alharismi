import {Scene} from '../../../app/core/simulation/scene';
import {Simulation} from '../../../app/core/simulation/simulation';
import {Heap} from '../../../app/core/simulation/structures/tree/binary-tree/heap/heap';
import {SimulationNode} from '../../../app/core/simulation/basics/simulation-node';
import {RedBlackTree} from '../../../app/core/simulation/structures/tree/binary-tree/red-black-tree/red-black-tree';

export class InsertionSecondCase implements Scene {
  id = 2;
  isFirst: boolean;
  isLast: boolean;
  played: 'not_played' | 'playing' | 'played' | 'unplayable' = 'not_played';
  set: boolean;
  setupPath: string;

  toAdd = 45;
  bst: RedBlackTree;
  async setup(simulation: Simulation): Promise<void> {

    const nodes = this.createNodes(simulation, [20, 10, 30, 40]);
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
    const node = simulation.objectFactory.create('node', this.bst.x, this.bst.y - 200, this.toAdd) as SimulationNode;
    simulation.nodeHandler.add(node);
    await this.bst.insert(node);
  }

  content(): string {
    return `
  <h1 class="scene-title">Insertion - second case</h1>

  <p>
    The second case occurs when new node's uncle is either black or doesn't even exist
    (opposite to the first case), and:
  </p>
  <ul>
    <li>
      New node is the right child of its parent;
    </li>
    <li>
      New node's parent is the right child of its own parent (new node's grandparent).
    </li>
  </ul>
  <p>or symmetrically both are left children of their respective parents.</p>
  <p>
    Now let's see the situation where where all three of nodes will be aligned
    as right children.
  </p>
  <p>
    The new node's parent and grandparent will get left-rotated (or right-rotated if the position were symmetrical)
    and grandparent will become the left child of the new node's parent.
  </p>
  <small>Checking propagates up the tree where new node's parent is checked next</small>
  <p>
    By adding a node with the value ${this.toAdd} to the right-hand side tree,
    it will become unbalanced and that imbalance will be regareded as the second case.
  </p>
  `;
  }

  successContent(): string {
    return `
  <p>
    All the properties of red-black tree are restored now by performing tri-node-restructuring.
  </p>
  <p>
    Adding ${this.toAdd} has caused imbalance, so nodes with values 30 and 40 got left-rotated, and
    30 become 40's left child, whereas ${this.toAdd} is 40's right child.
  </p>
  <p>
    During the same process, 30 was colored <span style="color: #bb4848;">red</span> and 40
    was colored <span style="color: #868686;">black</span>.
  </p>
  <p>
    Checking was propagated up the tree and since 20 was already colored <span style="color: #868686;">black</span>,
    alhorithm new that balance was restored.
  </p>
    `;
  }

}
