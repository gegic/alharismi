import {Scene} from '../../../app/core/simulation/scene';
import {Simulation} from '../../../app/core/simulation/simulation';
import {Heap} from '../../../app/core/simulation/structures/tree/binary-tree/heap/heap';
import {SimulationNode} from '../../../app/core/simulation/basics/simulation-node';
import {RedBlackTree} from '../../../app/core/simulation/structures/tree/binary-tree/red-black-tree/red-black-tree';

export class InsertionFirstCase implements Scene {
  id = 2;
  isFirst: boolean;
  isLast: boolean;
  played: 'not_played' | 'playing' | 'played' | 'unplayable' = 'not_played';
  set: boolean;
  setupPath: string;

  toAdd = 2.31;
  bst: RedBlackTree;
  async setup(simulation: Simulation): Promise<void> {

    const nodes = this.createNodes(simulation, [20, 10, 30]);
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
  <h1 class="scene-title">Insertion - first case</h1>
  <p>
    Since Red-black tree is a type of Binary search tree, insertion is quite similar.
  </p>
  <p>
    Essential difference lies in operations after the actual insertion. At that point,
    the tree might become unbalanced, i.e. some of the previously mentioned properties of a
    red-black tree might become compromised.
  </p>
  <p>
    Firstly, the newly inserted node is colored red, and properties of the tree are checked afterwards.
    If the parent of our newly inserted node is black, then we don't need to restructure the tree.
    However, if its parent is colored red, then there are three cases we need to check for.
  </p>
  <p>
    The first case occurs if new node's uncle (parent's sibling) is <span style="color: #bb4848;">red</span>.
    Then, both of those nodes should be colored in black and their parent (new node's grandparent) should be
    colored red.
  </p>
  <p>
    This recoloring procedure then propagates up the tree to our new node's grandparent, where everything is checked
    for again.
  </p>
  <small>If our new node's grandparent was root, then we will recolor it back to black no matter what.</small>
  <p>
    Let's now see this case on the tree on the right-hand side by inserting ${this.toAdd}.
  </p>
  `;
  }

  successContent(): string {
    return `
  <p>
    All the properties of red-black tree are restored now by performing recoloring.
  </p>
  <small>Since our new node's grandparent was root, it was recolored to black.</small>
    `;
  }

}
