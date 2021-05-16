import * as d3 from 'd3';
import {BstCell} from '../bst-cell';
import {SimulationLink} from '../../../basics/simulation-link';
import {SimulationGraph} from '../simulation-graph';
import {SimulationNode} from '../../../basics/simulation-node';

export abstract class BinaryTree extends SimulationGraph {
  treeHierarchy?: d3.HierarchyNode<BstCell>;
  children: { [id: number]: [BstCell | undefined, BstCell | undefined] } = {};
  parents: { [id: number]: [BstCell, number] } = {};

  protected constructor(id: number, x: number, y: number) {
    super();
    this.id = id;
    this.x = x;
    this.y = y;
  }

  abstract add(d: SimulationNode, bstCell: BstCell): Promise<void>;

  abstract delete(value: number): Promise<[SimulationNode, BstCell | null, BstCell]>;
  abstract insert(node: SimulationNode): Promise<void>;

  /**
   * Initializes the root.
   */
  setRoot(): void {
    const root = new BstCell(this, this.maxId++, this.x, this.y);
    root.isRoot = true;
    root.descriptor = `bst_${this.id}`;
    this.addCell(root, null);
  }

  /**
   * According to the provided side variable, adds a child to a parent.
   * @param cell - Child cell.
   * @param parent - Parent cell.
   * @param left - Whether to add child as the parent's left (**true**) or right (**false**) child
   */
  addCell(cell: BstCell, parent: BstCell | null, left: boolean = true): void {
    this.data.push(cell);
    // this.setLeftChild(parent, cell)
    if (left) {
      this.setLeftChild(parent, cell);
    } else {
      this.setRightChild(parent, cell);
    }
  }

  /**
   * Removes cell from the tree and detaches it from all other cells.
   * @param cell
   */
  deleteCell(cell: BstCell): void {
    this.links = this.links.filter((sl: SimulationLink) => sl.target !== cell && sl.source !== cell);
    this.data = this.data.filter(c => c !== cell);
    this.detachChildren(cell);
    this.detachParent(cell);
  }

  /**
   * Sets horizontal and vertical position of the tree.
   * @param x - Horizontal position.
   * @param y - Vertical position.
   */
  setPosition(x: number, y: number): void {
    this.x = x;
    this.y = y;

    this.alignForces();
  }

  /**
   * Positions the tree according to the d3 library using
   * d3.hierarchy and d3.tree(), which provide correct positioning
   * for all the nodes in the tree.
   */
  alignForces(): void {
    this.treeHierarchy = d3
      .hierarchy(this.getRoot(), (d: BstCell) => {
        const children: BstCell[] = [];
        const leftChild = this.getLeftChild(d);
        const rightChild = this.getRightChild(d);
        if (!!leftChild) {
          children.push(leftChild);
        }
        if (!!rightChild) {
          children.push(rightChild);
        }

        return children;
      });

    const treeMap = d3.tree()
      .nodeSize([200, 200]);

    treeMap(this.treeHierarchy)
      .descendants().forEach((d: d3.HierarchyPointNode<BstCell>) => {
      d.x += this.x;
      d.y += this.y;

      d.data.graphMoved(d.x, d.y);
    });
  }

  /**
   * Moves the whole tree if the cell is root, otherwise
   * returns the cell to its previous position
   * @param cell - Moved cell.
   * @param xPos - Horizontal position of the cell.
   * @param yPos - Vertical position of the cell.
   */
  moveCell(cell: BstCell, xPos: number, yPos: number): void {
    if (cell.isRoot) {
      this.setPosition(xPos, yPos);
      return;
    }
    else {
      cell.setTarget(cell.graphX, cell.graphY);
      return;
    }
  }

  /**
   * Removes the invalid node from the tree and deletes its children.
   */
  async fix(): Promise<void> {
    const invalidCell = this.data.find((c: BstCell) => !!c && !c.isValid);

    invalidCell.removeNode();
    const leftChild = this.getLeftChild(invalidCell);
    const rightChild = this.getRightChild(invalidCell);

    this.deleteCell(leftChild);
    this.deleteCell(rightChild);

    this.isValid = true;

    return;
  }

  /**
   * Generator which traverses the tree in a breadth-first manner.
   * @param root - Traversal starts from this cell.
   */
  *bfTraversal(root: BstCell): Generator<BstCell> {
    const queue: BstCell[] = [];
    queue.push(root);

    while (queue.length > 0) {
      const cell = queue.shift();
      const rightChild = this.getRightChild(cell);
      const leftChild = this.getLeftChild(cell);

      yield cell;

      if (!!rightChild) {
        queue.push(rightChild);
      }
      if (!!leftChild) {
        queue.push(leftChild);
      }
    }
  }

  /**
   * Reaches root by traversing a tree from the starting cell upwards.
   * @param cell - The starting cell.
   * @yields [currentCell, parent, childIndex] - The cell that generator is
   * currently checking, its parent and whether the cell if the
   * left child (0) or the right child (1) of its parent.
   */
  *upTree(cell: BstCell): Generator<[BstCell, BstCell, number]> {
    let [parent, childIndex] = this.getParent(cell);
    let currentCell = cell;
    while (!!currentCell) {
      yield [currentCell, parent, childIndex];
      currentCell = parent;
      [parent, childIndex] = this.getParent(parent);
    }
  }

  /**
   *
   * @param cell - Child cell.
   * @returns - The list which contains the parent of the passed cell,
   * and an index denoting whether the cell is left (0) or the right(1)
   * child of the parent.
   * If there's no cell, a list with undefined elements is returned.
   * @protected
   */
  protected getParent(cell: BstCell): [BstCell, number] | [undefined, undefined] {
    if (!cell) {
      return [undefined, undefined];
    }
    return this.parents[cell.id];
  }

  /**
   * @param cell - Parent
   * @returns - The left child of the provided *cell*.
   * If *cell* isn't provided, returns undefined.
   * @protected
   */
  protected getLeftChild(cell: BstCell): BstCell | undefined {
    if (!cell) {
      return undefined;
    }
    const children = this.children[cell.id];
    if (!children) {
      return undefined;
    }
    return children[0];
  }

  /**
   * Sets the child cell as the left child of the parent cell.
   * @param parent
   * @param child
   * @protected
   */
  protected setLeftChild(parent: BstCell, child: BstCell): void {
    this.detachParent(child);

    const parentId = !!parent ? parent.id : -1;
    if (!this.children[parentId]) {
      this.children[parentId] = [undefined, undefined];
    }
    this.children[parentId][0] = child;
    this.parents[child.id] = [parent, 0];
  }

  /**
   * @param cell - Parent
   * @returns - The right child of the provided *cell*.
   * If *cell* isn't provided, returns undefined.
   * @protected
   */
  protected getRightChild(cell: BstCell): BstCell | undefined {
    if (!cell) {
      return undefined;
    }
    const children = this.children[cell.id];
    if (!children) {
      return undefined;
    }
    return children[1];
  }

  /**
   * Sets the child cell as the right child of the parent cell.
   * @param parent
   * @param child
   * @protected
   */
  protected setRightChild(parent: BstCell, child: BstCell): void {
    this.detachParent(child);

    const parentId = !!parent ? parent.id : -1;
    if (!this.children[parentId]) {
      this.children[parentId] = [undefined, undefined];
    }
    this.children[parentId][1] = child;
    this.parents[child.id] = [parent, 1];
  }

  /**
   * Detaches cell from its children.
   * @param cell - Parent which will be detached from its children.
   * @protected
   */
  protected detachChildren(cell: BstCell): void {
    if (!this.children[cell.id]) {
      return;
    }
    for (const cellsChild of this.children[cell.id]) {
      if (!cellsChild) {
        continue;
      }
      if (this.parents[cellsChild.id][0] === cell) {
        delete this.parents[cellsChild.id];
      }
    }
    delete this.children[cell.id];
  }

  /**
   * Detaches cell from its parent.
   * @param cell - Child which will be detached from its parent.
   * @protected
   */
  protected detachParent(cell: BstCell): void {

    if (!this.parents[cell.id]) {
      return;
    }
    const [parent, childIndex] = this.parents[cell.id];
    const parentId = !!parent ? parent.id : -1;
    if (this.children[parentId][childIndex] === cell) {
      this.children[parentId][childIndex] = undefined;
    }
    delete this.parents[cell.id];
  }

  /**
   * @returns - The root of the tree.
   * @protected
   */
  protected getRoot(): BstCell {
    return this.children[-1][0];
  }
}
