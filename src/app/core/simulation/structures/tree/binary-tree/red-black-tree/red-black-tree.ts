import {SimulationNode} from '../../../../basics/simulation-node';
import {BstCell} from '../../bst-cell';
import {BinarySearchTree} from '../binary-search-tree/binary-search-tree';
import {BstCellDrag} from '../../../../helpers/drag/bst-cell-drag';
import {SimulationLink} from '../../../../basics/simulation-link';
import {root} from 'rxjs/internal-compatibility';
import {BstCellDrawing} from '../../../../helpers/drawing/bst-cell-drawing';

enum Color {
  RED = '#FF5A5A94',
  BLACK = '#636363FF'
}

export class RedBlackTree extends BinarySearchTree {

  colors: { [cellId: number]: Color; } = {};

  constructor(id: number, x: number, y: number) {
    super(id, x, y);
  }

  addCell(cell: BstCell, parent: BstCell | null, left = true): void {
    super.addCell(cell, parent, left);
    cell.descriptorColor = '#d2cdc8';
    this.setColor(cell, Color.BLACK);
  }

  async add(d: SimulationNode, bstCell: BstCell, animate = true): Promise<void> {
    await super.add(d, bstCell);
    if (this.isValid) {
      this.setColor(bstCell, Color.RED);
      await this.insertionCheckBalance(bstCell, animate);
    }
  }

  async delete(value: number, animate = true): Promise<[SimulationNode, BstCell | null, BstCell]> {
    const [node, affectedCell, deletedCell] = await super.delete(value, animate);

    await this.deletionCheckBalance(affectedCell, deletedCell, animate);
    return [node, affectedCell, deletedCell];
  }


  /**
   * Used to check balance of the tree after insertion.
   * Checks the colors of the starting cell and its ancestors if necessary, thus checking if all the nodes are balanced.
   * If an unbalanced node shows up, performs operations of balancing.
   * @param cell - The starting cell.
   * @private
   */
  private async insertionCheckBalance(cell: BstCell, animate = true): Promise<void> {
    let [parent, childIndex] = this.getParent(cell);
    while (this.getColor(parent) === Color.RED) {
      let [grandParent, parentIndex] = this.getParent(parent);
      if (cell.isRoot) {
        break;
      }
      if (parentIndex === 0) { // if parent is the left child
        const uncle = this.getRightChild(grandParent);
        if (this.getColor(uncle) === Color.RED) {
          // uncle is red
          this.setColor(parent, Color.BLACK);
          this.setColor(uncle, Color.BLACK);
          this.setColor(grandParent, Color.RED);
          cell = grandParent;
          [parent, childIndex] = this.getParent(cell);
        } else {
          // uncle is black
          if (childIndex === 1) {
            // currentCell is the right child
            cell = parent;
            [parent, childIndex] = [grandParent, parentIndex];
            [grandParent, parentIndex] = this.getParent(parent);
            await this.leftRotation(cell, animate);
            [parent, childIndex] = this.getParent(cell);
            [grandParent, parentIndex] = this.getParent(parent);
          }
          this.setColor(parent, Color.BLACK);
          this.setColor(grandParent, Color.RED);
          await this.rightRotation(grandParent, animate);
          [parent, childIndex] = this.getParent(cell);
          [grandParent, parentIndex] = this.getParent(parent);
        }
      } else { // if the parent is the right child
        const uncle = this.getLeftChild(grandParent);
        if (this.getColor(uncle) === Color.RED) {
          // uncle is red
          this.setColor(parent, Color.BLACK);
          this.setColor(uncle, Color.BLACK);
          this.setColor(grandParent, Color.RED);
          cell = grandParent;
          [parent, childIndex] = this.getParent(cell);
        } else {
          // uncle is black
          if (childIndex === 0) {
            // currentCell is the left child
            cell = parent;
            [parent, childIndex] = [grandParent, parentIndex];
            [grandParent, parentIndex] = this.getParent(parent);
            await this.rightRotation(cell, animate);
            [parent, childIndex] = this.getParent(cell);
            [grandParent, parentIndex] = this.getParent(parent);
          }
          [parent, childIndex] = this.getParent(cell);
          [grandParent, parentIndex] = this.getParent(parent);
          this.setColor(parent, Color.BLACK);
          this.setColor(grandParent, Color.RED);
          await this.leftRotation(grandParent, animate);
          [parent, childIndex] = this.getParent(cell);
          [grandParent, parentIndex] = this.getParent(parent);
        }
      }
    }
    const treeRoot = this.getRoot();
    this.setColor(treeRoot, Color.BLACK);
  }

  /**
   * Used to check balance of the tree after deletion.
   */
  async deletionCheckBalance(affectedCell: BstCell, deletedCell: BstCell, animate = true): Promise<void> {
    let [parent, childIndex] = this.getParent(affectedCell);
    let cell = deletedCell;
    while (!cell.isRoot && this.getColor(cell) === Color.BLACK) {
      if (childIndex === 0) {
        // if currentCell is a left node to its parent
        let sibling = this.getRightChild(parent);
        let siblingsColor = this.getColor(sibling);
        if (siblingsColor && siblingsColor === Color.RED) {
          this.setColor(sibling, Color.BLACK);
          this.setColor(parent, Color.RED);
          await this.leftRotation(parent, animate);
          sibling = this.getRightChild(parent);
          siblingsColor = this.getColor(sibling);
        }
        let leftNephew = this.getLeftChild(sibling);
        let rightNephew = this.getRightChild(sibling);
        let leftNephewColor = this.getColor(leftNephew);
        let rightNephewColor = this.getColor(rightNephew);
        if (leftNephewColor && leftNephewColor === Color.BLACK
          && rightNephewColor && rightNephewColor === Color.BLACK) {
          this.setColor(sibling, Color.RED);
          cell = parent;
          [parent, childIndex] = this.getParent(cell);
          sibling = this.getRightChild(parent);
          siblingsColor = this.getColor(sibling);
          leftNephew = this.getLeftChild(sibling);
          rightNephew = this.getRightChild(sibling);
          leftNephewColor = this.getColor(leftNephew);
          rightNephewColor = this.getColor(rightNephew);
        } else {
          if (rightNephewColor === Color.BLACK) {
            this.setColor(leftNephew, Color.BLACK);
            this.setColor(sibling, Color.RED);
            await this.rightRotation(sibling, animate);
            [parent, childIndex] = this.getParent(cell);
            sibling = this.getRightChild(parent);
            siblingsColor = this.getColor(sibling);
            rightNephew = this.getRightChild(sibling);
          }
          const parentColor = this.getColor(parent);
          this.setColor(sibling, parentColor);
          this.setColor(parent, Color.BLACK);
          this.setColor(rightNephew, Color.BLACK);
          await this.leftRotation(parent, animate);
          cell = this.getRoot();
        }
      } else {
        // if currentCell is a right node to its parent
        let sibling = this.getLeftChild(parent);
        let siblingsColor = this.getColor(sibling);
        if (siblingsColor && siblingsColor === Color.RED) {
          this.setColor(sibling, Color.BLACK);
          this.setColor(parent, Color.RED);
          await this.rightRotation(parent, animate);
          sibling = this.getLeftChild(parent);
          siblingsColor = this.getColor(sibling);
        }
        let rightNephew = this.getRightChild(sibling);
        let leftNephew = this.getLeftChild(sibling);
        let rightNephewColor = this.getColor(rightNephew);
        let leftNephewColor = this.getColor(leftNephew);
        if (rightNephewColor && rightNephewColor === Color.BLACK
          && leftNephewColor && leftNephewColor === Color.BLACK) {
          this.setColor(sibling, Color.RED);
          cell = parent;
          [parent, childIndex] = this.getParent(cell);
          sibling = this.getLeftChild(parent);
          siblingsColor = this.getColor(sibling);
          rightNephew = this.getRightChild(sibling);
          leftNephew = this.getLeftChild(sibling);
          rightNephewColor = this.getColor(rightNephew);
          leftNephewColor = this.getColor(leftNephew);
        } else {
          if (leftNephewColor === Color.BLACK) {
            this.setColor(rightNephew, Color.BLACK);
            this.setColor(sibling, Color.RED);
            await this.leftRotation(sibling, animate);
            sibling = this.getLeftChild(parent);
            siblingsColor = this.getColor(sibling);
            leftNephew = this.getLeftChild(sibling);
          }
          const parentColor = this.getColor(parent);
          this.setColor(sibling, parentColor);
          this.setColor(parent, Color.BLACK);
          this.setColor(leftNephew, Color.BLACK);
          await this.rightRotation(parent, animate);
          cell = this.getRoot();
        }
      }
    }
    this.setColor(cell, Color.BLACK);
  }

  private async leftRotation(rotationRoot: BstCell, animate = true): Promise<void> {
    const newRoot = this.getRightChild(rotationRoot);
    const t = this.getLeftChild(newRoot);
    // Perform rotation

    this.linkHelper.removeLink(newRoot, t);
    this.setRightChild(rotationRoot, t);
    this.linkHelper.addLink(rotationRoot, t);

    this.alignForces();
    if (animate) {
      await new Promise(r => setTimeout(r, 600));
    }

    const [rootParent, childIndex] = this.getParent(rotationRoot);
    this.detachParent(rotationRoot);
    this.linkHelper.removeLink(rootParent, rotationRoot);
    if (!rootParent) {
      newRoot.isRoot = true;
      newRoot.setDefaultDescriptor(rotationRoot.defaultDescriptor);
      rotationRoot.setDefaultDescriptor(undefined);
      rotationRoot.isRoot = false;
    }
    if (childIndex === 0) {
      this.setLeftChild(rootParent, newRoot);
    } else {
      this.setRightChild(rootParent, newRoot);
    }
    if (!!rootParent) {
      this.linkHelper.addLink(rootParent, newRoot);
    }
    // this.alignForces();
    // if (animate) {
    //   await new Promise(r => setTimeout(r, 600));
    // }
    this.linkHelper.removeLink(rotationRoot, newRoot);
    this.setLeftChild(newRoot, rotationRoot);
    this.linkHelper.addLink(newRoot, rotationRoot);

    this.alignForces();
    if (animate) {
      await new Promise(r => setTimeout(r, 600));
    }
  }

  private async rightRotation(rotationRoot: BstCell, animate = true): Promise<void> {
    const newRoot = this.getLeftChild(rotationRoot);
    const t = this.getRightChild(newRoot);
    // Perform rotation

    this.linkHelper.removeLink(newRoot, t);
    this.setLeftChild(rotationRoot, t);
    this.linkHelper.addLink(rotationRoot, t);
    this.alignForces();
    if (animate) {
      await new Promise(r => setTimeout(r, 600));
    }

    const [rootParent, childIndex] = this.getParent(rotationRoot);
    this.detachParent(rotationRoot);
    this.linkHelper.removeLink(rootParent, rotationRoot);
    if (!rootParent) {
      newRoot.isRoot = true;
      newRoot.setDefaultDescriptor(rotationRoot.defaultDescriptor);
      rotationRoot.setDefaultDescriptor(undefined);
      rotationRoot.isRoot = false;
    }
    if (childIndex === 0) {
      this.setLeftChild(rootParent, newRoot);
    } else {
      this.setRightChild(rootParent, newRoot);
    }
    if (!!rootParent) {
      this.linkHelper.addLink(rootParent, newRoot);
    }
    this.linkHelper.removeLink(rotationRoot, newRoot);
    this.setRightChild(newRoot, rotationRoot);
    this.linkHelper.addLink(newRoot, rotationRoot);
    this.alignForces();
    if (animate) {
      await new Promise(r => setTimeout(r, 600));
    }
  }

  getColor(cell: BstCell): Color | undefined {
    if (!cell) {
      return undefined;
    }
    if (!this.colors[cell.id]) {
      return Color.BLACK;
    }
    return this.colors[cell.id];
  }

  setColor(cell: BstCell, color: Color): void {
    if (!cell) {
      return;
    }
    this.colors[cell.id] = color;
    cell.setDefaultColor(color);
  }

  deleteCell(cell: BstCell): void {
    super.deleteCell(cell);
    this.setColor(cell, Color.BLACK);
  }
}
