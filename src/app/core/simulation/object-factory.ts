import {Drawable} from './drawable';
import {SimulationNode} from './basics/simulation-node';
import {SimulationArray} from './structures/array/simulation-array';
import {BinarySearchTree} from './structures/tree/binary-tree/binary-search-tree/binary-search-tree';
import {AvlTree} from './structures/tree/binary-tree/avl-tree/avl-tree';
import {RedBlackTree} from './structures/tree/binary-tree/red-black-tree/red-black-tree';
import {Heap} from './structures/tree/binary-tree/heap/heap';
import {LinkedList} from './structures/tree/linked-list/linked-list';
import {SimulationStack} from './structures/array/simulation-stack';
import {SimulationQueue} from './structures/array/simulation-queue';

type objectType = 'node' | 'array' | 'bst' | 'avl' | 'rb' | 'heap' | 'singlyLinkedList' | 'stack' | 'queue';

export class ObjectFactory {
  create(type: objectType, x: number, y: number, value?: number): Drawable {
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
      case 'singlylinkedlist':
        return this.createSinglyLinkedList(x, y);
      case 'stack':
        return this.createStack(x, y, value);
      case 'queue':
        return this.createQueue(x, y, value);
    }
  }

  private createNode(x: number, y: number, value?: number): SimulationNode {
    return new SimulationNode(value ?? 0, -1, x, y);
  }

  private createArray(x: number, y: number, value?: number): SimulationArray {
    const arr = new SimulationArray(-1, x, y);
    arr.setCapacity(value ?? 10);
    return arr;
  }

  private createStack(x: number, y: number, value?: number): SimulationStack {
    const stack = new SimulationStack(-1, x, y);
    stack.setCapacity(value ?? 10);
    return stack;
  }

  private createQueue(x: number, y: number, value?: number): SimulationQueue {
    const queue = new SimulationQueue(-1, x, y);
    queue.setCapacity(value ?? 10);
    return queue;
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
