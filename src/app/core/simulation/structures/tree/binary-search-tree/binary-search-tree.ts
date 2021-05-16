import {SimulationNode} from '../../../basics/simulation-node';
import * as d3 from 'd3';
import {SimulationLink} from '../../../basics/simulation-link';
import {SimulationGraph} from '../simulation-graph';
import {BstCell} from '../bst-cell';
import {BstCellMouse} from '../../../helpers/mouse/bst-cell-mouse';
import {BstCellDrag} from '../../../helpers/drag/bst-cell-drag';
import {BstCellDrawing} from '../../../helpers/drawing/bst-cell-drawing';
import {BinaryTree} from '../binary-tree/binary-tree';

export class BinarySearchTree extends BinaryTree {

  constructor(id: number, x: number, y: number) {
    super(id, x, y);
  }

  addChildCells(cell: BstCell): void {
    const leftChild = new BstCell(this, this.maxId++, cell.x, cell.y);
    const rightChild = new BstCell(this, this.maxId++, cell.x, cell.y);

    this.addCell(leftChild, cell, false);
    this.addCell(rightChild, cell, true);

    this.links.push(
      new SimulationLink(cell, leftChild),
      new SimulationLink(cell, rightChild)
    );
  }

  async add(d: SimulationNode, bstCell: BstCell): Promise<void> {

    bstCell.setNode(d);
    d.lockedPlaceholder = bstCell;

    this.addChildCells(bstCell);
    this.alignForces();

    const isValid = this.checkEntry(bstCell);

    if (!isValid) {
      this.isValid = false;
      bstCell.isValid = false;
    }
  }

  async find(value: number): Promise<BstCell | null> {

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

      await new Promise(r => setTimeout(r, 600));

      node.drawArrow = false;

      if (node.value === value) {
        node.highlighted = true;
        await new Promise(r => setTimeout(r, 600));
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
   * @return nodeCellPromise - A promise of an array consisting of simulation node,
   * a cell that was the first one affected by the occurred deletion, and a cell from
   * which the node was deleted.
   * The cell is null if the deleted node didn't have a parent, i.e. it was the root.
   */
  async delete(value: number): Promise<[SimulationNode, BstCell | null, BstCell]> {
    const found = await this.find(value);
    if (!found) {
      return null;
    }
    const leftChild = this.getLeftChild(found);
    const rightChild = this.getRightChild(found);

    if (!leftChild.node && !rightChild.node) {
      return await this.deleteLeaf(found, leftChild, rightChild);
    } else if (!leftChild.node || !rightChild.node) {
      return await this.deleteOnlyChild(found, leftChild, rightChild);
    } else {
      return await this.deleteTwoChildren(found, leftChild);
    }
  }

  /**
   * Deletes a node which doesn't have any children besides empty cells (which are mandatory).
   * @param target - The cell being deleted.
   * @param leftChild - Left child of the cell being deleted.
   * @param rightChild - Right child of the cell being deleted.
   * @returns promise - A promise of the node which was deleted,
   * and the exact cell from which the node was deleted (twice for uniformity).
   */
  async deleteLeaf(target: BstCell, leftChild: BstCell, rightChild: BstCell): Promise<[SimulationNode, BstCell | null, BstCell]> {
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
   * @returns promise - A promise of the node which was deleted and the cell which replaces 'target'
   * (i.e. this cell was target's child and now is a child of the same cell the target was).
   */
  async deleteOnlyChild(target: BstCell, leftChild: BstCell, rightChild: BstCell): Promise<[SimulationNode, BstCell | null, BstCell]> {
    const parent = this.getParent(target)[0];
    const takenCell = !!leftChild.node ? leftChild : rightChild;
    const freeCell = !leftChild.node ? leftChild : rightChild;
    this.deleteCell(freeCell);
    this.deleteCell(target);

    if (leftChild === target) {
      this.setLeftChild(parent, takenCell);
    } else {
      this.setRightChild(parent, takenCell);
    }

    const node = target.removeNode();

    if (!!node) {
      node.setTarget(this.x, this.y - 100);
    }

    await new Promise(r => setTimeout(r, 600));

    if (parent) {
      this.links.push(new SimulationLink(parent, takenCell));
    } else {
      this.setLeftChild(null, takenCell);
      takenCell.descriptor = target.descriptor;
      takenCell.isRoot = true;
    }
    this.alignForces();

    return [node, takenCell, target];
  }

  /**
   * Deletes the node whose both children contain nodes.
   * @param target - The cell being deleted.
   * @param leftChild - Left child of the cell being deleted.
   * @return nodeCellPromise - A promise of an array consisting of simulation node,
   * the cell that was the first one affected by the occurred deletion, and the cell
   * from which the node was deleted.
   *
   * The affected cell is null if the deleted node didn't have a parent, i.e. it was the root.
   */
  async deleteTwoChildren(target: BstCell, leftChild: BstCell): Promise<[SimulationNode, BstCell | null, BstCell]> {
    const substituteCell = this.findMax(leftChild);
    const substituteNode = substituteCell.removeNode();

    const node = target.removeNode();
    node.setTarget(this.x, this.y - 100);

    substituteNode.setTarget(target.x, target.y);

    await new Promise(r => setTimeout(r, 600));

    target.setNode(substituteNode);

    const substituteLeft = this.getLeftChild(substituteCell);
    const substituteRight = this.getRightChild(substituteCell);

    let deleted: [SimulationNode, BstCell | null, BstCell];
    if (!substituteLeft.node && !substituteRight.node) {
      deleted = (await this.deleteLeaf(substituteCell, substituteLeft, substituteRight));
    } else if (!substituteLeft.node || !substituteRight.node) {
      deleted = (await this.deleteOnlyChild(substituteCell, substituteLeft, substituteRight));
    }

    return [node, deleted[1], deleted[2]];
  }

  findMax(sourceSubtreeRoot: BstCell): BstCell {
    let rightCell = sourceSubtreeRoot;
    let potentialRightCell = this.getRightChild(rightCell);
    while (!!potentialRightCell.node) {
      rightCell = potentialRightCell;
      potentialRightCell = this.getRightChild(rightCell);
    }

    return rightCell;
  }


  async insert(node: SimulationNode): Promise<void> {
    let checkingCell = this.getRoot();

    while (checkingCell) {
      let side = 0;
      if (!checkingCell.node) {
        node.setTarget(checkingCell.x + side, checkingCell.y - 100);
        await new Promise(r => setTimeout(r, 600));
        await this.add(node, checkingCell);
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
        node.setTarget(checkingNode.x + side, checkingNode.y);
        await new Promise(r => setTimeout(r, 600));
      } else {
        side = 100;
        checkingCell = this.getRightChild(checkingCell);
        node.setTarget(checkingNode.x + side, checkingNode.y);
        await new Promise(r => setTimeout(r, 600));
      }
      checkingNode.drawArrow = false;
    }
  }

  protected checkEntry(cell: BstCell): boolean {
    const upTreeGenerator = this.upTree(cell);
    let iterator = upTreeGenerator.next();
    if (iterator.done) {
      return true;
    }

    while (!iterator.done) {
      const [, parent, childIndex] = iterator.value;

      if (!parent) {
        return true;
      }

      const isLeftChild = childIndex === 0;
      // if the left child
      if (isLeftChild) {
        if (cell.node.value > parent.node.value) {
          return false;
        }
      } else {
        if (cell.node.value < parent.node.value) {
          return false;
        }
      }
      iterator = upTreeGenerator.next();
    }

    return true;
  }
}
