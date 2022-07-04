import {Scenario} from '../../../app/core/simulation/scenario';
import {Scene} from '../../../app/core/simulation/scene';
import {Simulation} from '../../../app/core/simulation/simulation';
import {SimulationArray} from '../../../app/core/simulation/structures/array/simulation-array';
import {LinkedList} from '../../../app/core/simulation/structures/tree/linked-list/linked-list';
import heapScenario from '../heap-scenario';
import {BinarySearchTree} from '../../../app/core/simulation/structures/tree/binary-tree/binary-search-tree/binary-search-tree';
import {Heap} from '../../../app/core/simulation/structures/tree/binary-tree/heap/heap';

export class TreeScene implements Scene {
  id = 0;
  isFirst: boolean;
  isLast: boolean;
  played: 'not_played' | 'playing' | 'played' | 'unplayable' = 'unplayable';
  set: boolean;
  setupPath: string;

  async setup(simulation: Simulation): Promise<void> {
    const nodes = simulation.nodeHandler.generateNodes(6);
    simulation.nodeHandler.add(nodes);

    const heap = simulation.objectFactory.create('heap', 0, 0) as Heap;
    simulation.heapHandler.add(heap);

    for (const node of nodes) {
      await heap.insert(node, false);
    }
  }

  play(simulation: Simulation): void {
  }

  content(): string {
    return `
  <h1 class="scene-title">Tree - Binary tree</h1>
  <p>
    A <em>tree</em> is a data structure consisting of nodes which are placed in a
    hierarchical order.
  </p>
  <p>
    In general, each node individually has a parent node and an arbitrary number of children nodes.
    That means that every single node of a tree contains its own set of children nodes. Finding a
    parent of some <b>target</b> node in the tree is only a matter of knowing which node contains
    <b>target</b> node as an element in its children set.
  </p>
  <p>
    The first node of a tree, the topmost one which doesn't have any parents is called the
    <em>root</em> node.
  </p>
  <p>
    Nodes which do not have any children are called <em>leaf</em> nodes, and they are
    last nodes of every branch in a tree.
  </p>
  <p>
    Looking at a particular <b>target</b> node in a tree and all of its descendants, that portion can
    be considered as a <em>subtree</em>.
  </p>
  <p>
    <em>Height</em> of a <b>target</b> node is the longest distance to a leaf in its subtree. That is, the highest number of nodes
    which have to be passed on a path from the <b>target</b> node to any leaf which is a descendant of that <b>target</b> node.
  </p>
  <p>
    Type of a tree covered here is called a <em>binary tree</em>. It's a tree where each node has two children nodes
    at most
  </p>

  `;
  }

  successContent(): string {
    return '';
  }

}
