import {Scene} from '../../../app/core/simulation/scene';
import {Simulation} from '../../../app/core/simulation/simulation';
import {Heap} from '../../../app/core/simulation/structures/tree/binary-tree/heap/heap';
import {BinarySearchTree} from '../../../app/core/simulation/structures/tree/binary-tree/binary-search-tree/binary-search-tree';

export class Search implements Scene {
  id = 1;
  isFirst: boolean;
  isLast: boolean;
  played: 'not_played' | 'playing' | 'played' | 'unplayable' = 'not_played';
  set: boolean;
  setupPath: string;

  searchValue = -1;
  rootValue = -1;
  rightOrLeft = 'left';
  bst: BinarySearchTree;
  async setup(simulation: Simulation): Promise<void> {
    const nodes = simulation.nodeHandler.generateNodes(12);
    simulation.nodeHandler.add(nodes);

    this.bst = simulation.objectFactory.create('bst', 0, 0) as BinarySearchTree;
    simulation.bstHandler.add(this.bst);

    for (const node of nodes) {
      await this.bst.insert(node, false);
    }

    if (nodes[6] !== this.bst.getRoot().node) {
      this.searchValue = nodes[6].value;
    } else {
      this.searchValue = nodes[7].value;
    }
    this.rootValue = this.bst.getRoot().node.value;
    if (this.searchValue < this.rootValue) {
      this.rightOrLeft = 'left';
    } else {
      this.rightOrLeft = 'right';
    }
  }

  async play(simulation: Simulation): Promise<void> {
    await this.bst.find(this.searchValue);
  }

  content(): string {
    return `
  <h1 class="scene-title">Searching</h1>
  <p>
    Searching in a binary search tree is quite a simple procedure.
  </p>
  <p>
    The algorithm depends on the property of BST that each left
    subtree has values lower than an observed node and each right subtree has values higher than the node.
  </p>
  <p>
    If the value we are looking for is lower than the current node, we can say for sure that the value is not in the right subtree; we
    need to only search in the left subtree and if the value is above the node, we can say for sure that the value is not in the left
    subtree; we need to only search in the right subtree.
  </p>
  <p>
    Let's try to find ${this.searchValue} in the tree.
  </p>
  `;
  }

  successContent(): string {
    return `
  <p>
    When we are searching for the node with value ${this.searchValue} in the binary tree from the right-hand side,
    we will first check the root. The value placed in the root is ${this.rootValue}, so we checked its
    ${this.rightOrLeft} subtree.
  </p>
  <small>
    There is a chance we won't find our desired value, and we will know that it isn't present in the tree
    when we come across a leaf.
  </small>
    `;
  }

}
