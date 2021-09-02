import {Scene} from '../../../app/core/simulation/scene';
import {Simulation} from '../../../app/core/simulation/simulation';
import {Heap} from '../../../app/core/simulation/structures/tree/binary-tree/heap/heap';
import {BinarySearchTree} from '../../../app/core/simulation/structures/tree/binary-tree/binary-search-tree/binary-search-tree';

export class BstScene implements Scene {
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

    const bst = simulation.objectFactory.create('bst', 0, 0) as BinarySearchTree;
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
  <h1 class="scene-title">Binary search tree</h1>
  <p>
    Binary search tree is a <a href="/visualize/heap">binary tree</a> which has the following properties:
  </p>
  <ul>
    <li>
       Every descendant of a node starting from its <em>left</em> child, i.e. every node in the left subtree
       has a lower value than that of the given node;
    </li>
    <li>
       Every descendant of a node starting from its <em>right</em> child, i.e. every node in the right subtree
       has a higher value than that of the given node;
    </li>
    <li>
        Aforementioned properties apply for every single node of a binary search tree.
    </li>
  </ul>
  <p>
    Looking at the right-hand side, root of the tree has a value of ${this.rootValue}, and
    every node starting from its left child has a lower value, whereas every node
    from the right subtree has a higher value.
  </p>
  <p>
    Let's see how binary search tree makes searching more efficient!
  </p>
  `;
  }

  successContent(): string {
    return '';
  }

}
