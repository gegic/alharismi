import {SimulationNode} from '../../../../basics/simulation-node';
import * as d3 from 'd3';
import {SimulationLink} from '../../../../basics/simulation-link';
import {SimulationGraph} from '../../simulation-graph';
import {BstCell} from '../../bst-cell';
import {BstCellMouse} from '../../../../helpers/mouse/bst-cell-mouse';
import {BstCellDrag} from '../../../../helpers/drag/bst-cell-drag';
import {BstCellDrawing} from '../../../../helpers/drawing/bst-cell-drawing';
import {BinaryTree} from '../binary-tree';

export class BinarySearchTree extends BinaryTree {

  children: { [id: number]: [BstCell | undefined, BstCell | undefined] } = {};
  parents: { [id: number]: [BstCell, number] } = {};

  constructor(id: number, x: number, y: number) {
    super(id, x, y);
  }

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
    this.linkHelper.detachCompletely(cell);
    this.data = this.data.filter(c => c !== cell);
    this.detachChildren(cell);
    this.detachParent(cell);
  }


  addChildCells(cell: BstCell): void {
    const leftChild = new BstCell(this, this.maxId++, cell.x, cell.y);
    const rightChild = new BstCell(this, this.maxId++, cell.x, cell.y);

    this.addCell(leftChild, cell, false);
    this.addCell(rightChild, cell, true);

    this.linkHelper.addLink(cell, leftChild);
    this.linkHelper.addLink(cell, rightChild);
  }

  async add(d: SimulationNode, bstCell: BstCell, animate = true): Promise<void> {

    bstCell.setNode(d);

    this.addChildCells(bstCell);
    this.alignForces();

    const isValid = this.checkEntry(bstCell);

    if (!isValid) {
      this.isValid = false;
      bstCell.isValid = false;
    }

  }

  async find(value: number, animate = true): Promise<BstCell | null> {

    if (this.data.length === 0) {
      return null;
    }

    let checkingCell = this.getRoot();

    while (checkingCell) {
      if (!checkingCell.node) {
        return null;
      }
      const node = checkingCell.node;
      node.drawArrow = true;

      if (animate) {
        await new Promise(r => setTimeout(r, 600));
      }

      node.drawArrow = false;

      if (node.value === value) {
        node.highlighted = true;
        if (animate) {
          await new Promise(r => setTimeout(r, 600));
        }
        node.highlighted = false;
        return checkingCell;
      } else if (value < node.value) {
        checkingCell = this.getLeftChild(checkingCell);
      } else {
        checkingCell = this.getRightChild(checkingCell);
      }
    }
  }

  /**
   * Finds and deletes a node with the passed value.
   * @param value - Value used to find a node and then delete it.
   * @param animate
   * @return nodeCellPromise - A promise of an array consisting of simulation node,
   * a cell that was the first one affected by the occurred deletion, and a cell from
   * which the node was deleted.
   * The cell is null if the deleted node didn't have a parent, i.e. it was the root.
   */
  async delete(value: number, animate = true): Promise<[SimulationNode, BstCell | null, BstCell]> {
    const found = await this.find(value, animate);
    if (!found) {
      return null;
    }
    const leftChild = this.getLeftChild(found);
    const rightChild = this.getRightChild(found);

    let ret: [SimulationNode, BstCell | null, BstCell];
    if (!leftChild.node && !rightChild.node) {
      ret = await this.deleteLeaf(found, leftChild, rightChild);
    } else if (!leftChild.node || !rightChild.node) {
      ret = await this.deleteOnlyChild(found, leftChild, rightChild);
    } else {
      ret = await this.deleteTwoChildren(found, leftChild);
    }
    ret[0].setTarget(this.x, this.y - 200);
    return ret;
  }

  /**
   * Deletes a node which doesn't have any children besides empty cells (which are mandatory).
   * @param target - The cell being deleted.
   * @param leftChild - Left child of the cell being deleted.
   * @param rightChild - Right child of the cell being deleted.
   * @param animate - Whether the process should be animated.
   * @returns promise - A promise of the node which was deleted,
   * and the exact cell from which the node was deleted (twice for uniformity).
   */
  async deleteLeaf(target: BstCell, leftChild: BstCell, rightChild: BstCell, animate = true):
    Promise<[SimulationNode, BstCell | null, BstCell]> {
    this.deleteCell(leftChild);
    this.deleteCell(rightChild);

    this.alignForces();



    return [target.removeNode(), target, target];
  }

  /**
   * Deletes a node which which has one child cell that contains a node and one that does not.
   * @param target - The cell being deleted.
   * @param leftChild - Left child of the cell being deleted.
   * @param rightChild - Right child of the cell being deleted.
   * @param animate - Whether the process should be animated.
   * @returns promise - A promise of the node which was deleted and the cell which replaces 'target'
   * (i.e. this cell was target's child and now is a child of the same cell the target was).
   */
  async deleteOnlyChild(target: BstCell, leftChild: BstCell, rightChild: BstCell, animate = true):
    Promise<[SimulationNode, BstCell | null, BstCell]> {
    const [parent, targetIndex] = this.getParent(target);
    const takenCell = !!leftChild.node ? leftChild : rightChild;
    const freeCell = !leftChild.node ? leftChild : rightChild;
    this.deleteCell(freeCell);
    this.deleteCell(target);

    if (targetIndex === 0) {
      this.setLeftChild(parent, takenCell);
    } else {
      this.setRightChild(parent, takenCell);
    }

    const node = target.removeNode();

    if (animate) {
      if (!!node) {
        node.setTarget(this.x, this.y - 100);
      }

      await new Promise(r => setTimeout(r, 600));
    }

    if (parent) {
      this.linkHelper.addLink(parent, takenCell);
    } else {
      this.setLeftChild(null, takenCell);
      takenCell.setDefaultDescriptor(target.defaultDescriptor);
      takenCell.isRoot = true;
    }
    this.alignForces();

    return [node, takenCell, target];
  }

  /**
   * Deletes the node whose both children contain nodes.
   * @param target - The cell being deleted.
   * @param leftChild - Left child of the cell being deleted.
   * @param animate - Whether the process should be animated.
   * @return nodeCellPromise - A promise of an array consisting of simulation node,
   * the cell that was the first one affected by the occurred deletion, and the cell
   * from which the node was deleted.
   *
   * The affected cell is null if the deleted node didn't have a parent, i.e. it was the root.
   */
  async deleteTwoChildren(target: BstCell, leftChild: BstCell, animate = true):
    Promise<[SimulationNode, BstCell | null, BstCell]> {
    const substituteCell = await this.findMax(leftChild);
    const substituteNode = substituteCell.removeNode();

    const node = target.removeNode();

    if (animate) {
      node.setTarget(this.x, this.y - 100);
      substituteNode.setTarget(target.x, target.y);
      await new Promise(r => setTimeout(r, 600));
    }

    target.setNode(substituteNode);

    const substituteLeft = this.getLeftChild(substituteCell);
    const substituteRight = this.getRightChild(substituteCell);

    let deleted: [SimulationNode, BstCell | null, BstCell];
    if (!substituteLeft.node && !substituteRight.node) {
      deleted = (await this.deleteLeaf(substituteCell, substituteLeft, substituteRight, animate));
    } else if (!substituteLeft.node || !substituteRight.node) {
      deleted = (await this.deleteOnlyChild(substituteCell, substituteLeft, substituteRight, animate));
    }

    return [node, deleted[1], deleted[2]];
  }

  async findMax(sourceSubtreeRoot: BstCell, animate = true): Promise<BstCell> {
    let rightCell = sourceSubtreeRoot;
    if (animate) {
      rightCell.highlight('#5cff00');
      await new Promise(r => setTimeout(r, 600));
      rightCell.resetColor();
    }
    let potentialRightCell = this.getRightChild(rightCell);
    while (!!potentialRightCell.node) {
      rightCell = potentialRightCell;
      if (animate) {
        rightCell.highlight('#5cff00');
        await new Promise(r => setTimeout(r, 600));
        rightCell.resetColor();
      }
      potentialRightCell = this.getRightChild(rightCell);
    }

    return rightCell;
  }


  async insert(node: SimulationNode, animate = true): Promise<void> {
    let checkingCell = this.getRoot();

    while (checkingCell) {
      let side = 0;
      if (!checkingCell.node) {
        if (animate) {
          node.setTarget(checkingCell.x + side, checkingCell.y - 100);
          await new Promise(r => setTimeout(r, 600));
        }
        await this.add(node, checkingCell, animate);
        return;
      }

      const checkingNode = checkingCell.node;

      checkingNode.drawArrow = true;

      if (checkingNode.value === node.value) {
        checkingNode.drawArrow = false;
        return;
      } else if (checkingNode.value > node.value) {
        side = -100;
        checkingCell = this.getLeftChild(checkingCell);
        if (animate) {
          node.setTarget(checkingNode.x + side, checkingNode.y);
          await new Promise(r => setTimeout(r, 600));
        }
      } else {
        side = 100;
        checkingCell = this.getRightChild(checkingCell);
        if (animate) {
          node.setTarget(checkingNode.x + side, checkingNode.y);
          await new Promise(r => setTimeout(r, 600));
        }
      }
      checkingNode.drawArrow = false;
    }
  }

  protected checkEntry(cell: BstCell): boolean {

    let [parent, childIndex] = this.getParent(cell);
    while (!!parent) {

      const isLeftChild = childIndex === 0;
      if (isLeftChild) {
        if (cell.node.value > parent.node.value) {
          return false;
        }
      } else {
        if (cell.node.value < parent.node.value) {
          return false;
        }
      }
      [parent, childIndex] = this.getParent(parent);
    }

    return true;
  }

  /**
   * @param cell - Parent
   * @returns - The left child of the provided *cell*.
   * If *cell* isn't provided, returns undefined.
   * @protected
   */
  getLeftChild(cell: BstCell): BstCell | undefined {
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
    if (!child) {
      return;
    }
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
  getRightChild(cell: BstCell): BstCell | undefined {
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
    if (!child) {
      return;
    }
    this.detachParent(child);

    const parentId = !!parent ? parent.id : -1;
    if (!this.children[parentId]) {
      this.children[parentId] = [undefined, undefined];
    }
    this.children[parentId][1] = child;
    this.parents[child.id] = [parent, 1];
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
  getParent(cell: BstCell): [BstCell, number] | [undefined, undefined] {
    if (!cell) {
      return [undefined, undefined];
    }
    console.log(cell.id);
    console.log(this.parents);
    return this.parents[cell.id];
  }

  /**
   * Detaches cell from its children.
   * @param cell - Parent which will be detached from its children.
   * @protected
   */
  protected detachChildren(cell: BstCell): void {
    if (!cell || !this.children[cell.id]) {
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
    if (!cell) {
      return;
    }
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
   */
  getRoot(): BstCell {
    return this.children[-1][0];
  }
}
