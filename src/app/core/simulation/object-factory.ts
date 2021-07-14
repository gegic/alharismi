import {Drawable} from './drawable';
import {SimulationNode} from './basics/simulation-node';
import {SimulationArray} from './structures/array/simulation-array';
import {BinarySearchTree} from './structures/tree/binary-tree/binary-search-tree/binary-search-tree';
import {AvlTree} from './structures/tree/binary-tree/avl-tree/avl-tree';
import {RedBlackTree} from './structures/tree/binary-tree/red-black-tree/red-black-tree';
import {Heap} from './structures/tree/binary-tree/heap/heap';
import {LinkedList} from './structures/tree/linked-list/linked-list';

export class ObjectFactory {
  create(type: string, x: number, y: number, value?: number): Drawable {
    switch (type.toLowerCase()) {
      case 'node':
        return this.createNode(x, y, value);
      case 'array':
        return this.createArray(x, y, value);
      case 'bst':
        return this.createBst(x, y);
      case 'avl':
        return this.createAvl(x, y);
      case 'rb':
        return this.createRb(x, y);
      case 'heap':
        return this.createHeap(x, y);
      case 'singlyLinkedList':
        return this.createSinglyLinkedList(x, y);
    }
  }

  private createNode(x: number, y: number, value?: number): SimulationNode {
    return new SimulationNode(value ?? 0, -1, x, y);
  }

  private createArray(x: number, y: number, value?: number): SimulationArray {
    return new SimulationArray(-1, value ?? 10, x, y);
  }

  private createBst(x: number, y: number): BinarySearchTree {
    return new BinarySearchTree(-1, x, y);
  }

  private createAvl(x: number, y: number, value?: number): AvlTree {
    return new AvlTree(-1, x, y);
  }

  private createRb(x: number, y: number, value?: number): RedBlackTree {
    return new RedBlackTree(-1, x, y);
  }

  private createHeap(x: number, y: number, value?: number): Heap {
    return new Heap(-1, x, y);
  }

  private createSinglyLinkedList(x: number, y: number, value?: number): LinkedList {
    return new LinkedList(-1, x, y);
  }

}
