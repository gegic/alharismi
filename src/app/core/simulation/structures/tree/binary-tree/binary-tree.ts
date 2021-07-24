import * as d3 from 'd3';
import {BstCell} from '../bst-cell';
import {SimulationLink} from '../../../basics/simulation-link';
import {SimulationGraph} from '../simulation-graph';
import {SimulationNode} from '../../../basics/simulation-node';

export abstract class BinaryTree extends SimulationGraph {
  treeHierarchy?: d3.HierarchyNode<BstCell>;

  protected constructor(id: number, x: number, y: number) {
    super(id, x, y);
  }

  abstract add(d: SimulationNode, bstCell: BstCell): Promise<void>;

  abstract delete(value: number): Promise<[SimulationNode, BstCell | null, BstCell]>;
  abstract insert(node: SimulationNode): Promise<void>;
  /**
   * According to the provided side variable, adds a child to a parent.
   * @param cell - Child cell.
   * @param parent - Parent cell.
   * @param left - Whether to add child as the parent's left (**true**) or right (**false**) child
   */
  abstract addCell(cell: BstCell, parent: BstCell | null, left: boolean): void;

  /**
   *
   * @param cell - Child cell.
   * @returns - The list which contains the parent of the passed cell,
   * and an index denoting whether the cell is left (0) or the right(1)
   * child of the parent.
   * If there's no cell, a list with undefined elements is returned.
   * @protected
   */
  protected abstract getParent(cell: BstCell): [BstCell, number] | [undefined, undefined];

  /**
   * @param cell - Parent
   * @returns - The left child of the provided *cell*.
   * If *cell* isn't provided, returns undefined.
   * @protected
   */
  protected abstract getLeftChild(cell: BstCell): BstCell | undefined;

  /**
   * Sets the child cell as the left child of the parent cell.
   * @param parent
   * @param child
   * @protected
   */
  protected abstract setLeftChild(parent: BstCell, child: BstCell): void;

  /**
   * @param cell - Parent
   * @returns - The right child of the provided *cell*.
   * If *cell* isn't provided, returns undefined.
   * @protected
   */
  protected abstract getRightChild(cell: BstCell): BstCell | undefined;

  /**
   * Sets the child cell as the right child of the parent cell.
   * @param parent
   * @param child
   * @protected
   */
  protected abstract setRightChild(parent: BstCell, child: BstCell): void;

  /**
   * Detaches cell from its children.
   * @param cell - Parent which will be detached from its children.
   * @protected
   */
  protected abstract detachChildren(cell: BstCell): void;

  /**
   * Detaches cell from its parent.
   * @param cell - Child which will be detached from its parent.
   * @protected
   */
  protected abstract detachParent(cell: BstCell): void;

  /**
   * @returns - The root of the tree.
   * @protected
   */
  abstract getRoot(): BstCell;

  /**
   * Initializes the root.
   */
  setRoot(): void {
    const root = new BstCell(this, this.maxId++, this.x, this.y);
    root.isRoot = true;
    root.descriptor = `tree_${this.id}`;
    this.addCell(root, null, true);
  }


  /**
   * Removes cell from the tree and detaches it from all other cells.
   * @param cell
   */
  abstract deleteCell(cell: BstCell): void;

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
      .nodeSize([180, 180]);

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
    invalidCell.isValid = true;

    this.alignForces();
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
}
