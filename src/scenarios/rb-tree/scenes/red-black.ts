import {Scene} from '../../../app/core/simulation/scene';
import {Simulation} from '../../../app/core/simulation/simulation';
import {Heap} from '../../../app/core/simulation/structures/tree/binary-tree/heap/heap';
import {BinarySearchTree} from '../../../app/core/simulation/structures/tree/binary-tree/binary-search-tree/binary-search-tree';
import {RedBlackTree} from '../../../app/core/simulation/structures/tree/binary-tree/red-black-tree/red-black-tree';

export class RedBlack implements Scene {
  id = 0;
  isFirst: boolean;
  isLast: boolean;
  played: 'not_played' | 'playing' | 'played' | 'unplayable' = 'unplayable';
  set: boolean;
  setupPath: string;

  rootValue = -1;

  async setup(simulation: Simulation): Promise<void> {
    const nodes = simulation.nodeHandler.generateNodes(6);
    simulation.nodeHandler.add(nodes);

    const bst = simulation.objectFactory.create('rb', 0, 0) as RedBlackTree;
    simulation.bstHandler.add(bst);

    for (const node of nodes) {
      await bst.insert(node, false);
    }

    this.rootValue = bst.getRoot().node.value;
  }

  play(simulation: Simulation): void {
  }

  content(): string {
    return `
  <h1 class="scene-title">Red-black tree</h1>
  <p>
    In the previous section, there was one disadvantageous property of a Binary search tree. That is,
    if nodes were added in a specific order, tree might become unbalanced and many of its nodes
    would lean to one side, thus reducing effectiveness of the tree and making it perform more
    like a linked list.
  </p>
  <p>
    Therefore, Red-black trees are implemented in order to eliminate that imbalance which is present in
    an ordinary Binary search tree. After every insertion or deletion, some form of rebalancing is performed
    in order to make tree more effective.
  </p>
  <p>
    Red-black trees have all the properties an ordinary binary search trees have, and additionaly:
  </p>
  <ul>
    <li>
      The <span style="color: #868686;">root</span> is black;
    </li>
    <li>
      All children of a <span style="color: #bb4848;">red node</span> are <span style="color: #868686;">black</span>;
    </li>
    <li>
      For each node, any simple path from this node to any of its descendant leaf has the same number of black nodes;
    </li>
    <li>
        All leaves are <span style="color: #868686;">black</span>.
    </li>
  </ul>
  <p>
    As searching works the same as in an ordinary binary search tree, only insertion and deletion will be presented.
  </p>
  `;
  }

  successContent(): string {
    return '';
  }

}
