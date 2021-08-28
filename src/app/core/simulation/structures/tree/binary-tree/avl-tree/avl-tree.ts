import {SimulationNode} from '../../../../basics/simulation-node';
import {BstCell} from '../../bst-cell';
import {BinarySearchTree} from '../binary-search-tree/binary-search-tree';
import {BstCellDrag} from '../../../../helpers/drag/bst-cell-drag';
import {SimulationLink} from '../../../../basics/simulation-link';
import {root} from 'rxjs/internal-compatibility';
import {BstCellDrawing} from '../../../../helpers/drawing/bst-cell-drawing';

export class AvlTree extends BinarySearchTree {

  heights: { [cellId: number]: number; } = {};

  constructor(id: number, x: number, y: number) {
    super(id, x, y);
  }

  async add(d: SimulationNode, bstCell: BstCell, animate = true): Promise<void> {
    await super.add(d, bstCell);
    if (this.isValid) {
      await this.checkBalance(bstCell, animate);
    }
  }

  async delete(value: number, animate = true): Promise<[SimulationNode, BstCell | null, BstCell]> {
    const [node, affectedCell, deletedCell] = await super.delete(value);

    await this.checkBalance(affectedCell, animate);
    return [node, affectedCell, deletedCell];
  }


  /**
   * Updates the heights of the starting cell and all of its ancestors and checks if all nodes are balanced.
   * If an unbalanced node shows up, performs operations of balancing.
   * @param cell - The starting cell.
   * @param animate
   * @private
   */
  private async checkBalance(cell: BstCell, animate = true): Promise<void> {

    while (!!cell) {
      if (this.heights[cell.id] === undefined) {
        this.setHeight(cell, 0);
        [cell] = this.getParent(cell);
        continue;
      }
      if (!cell.node) {
        delete this.heights[cell.id];
        [cell] = this.getParent(cell);
        continue;
      }
      const leftChild = this.getLeftChild(cell);
      const rightChild = this.getRightChild(cell);
      const leftHeight = this.getHeight(leftChild);
      const rightHeight = this.getHeight(rightChild);
      this.setHeight(cell, 1 + Math.max(leftHeight, rightHeight));

      const balance = leftHeight - rightHeight;

      if (!cell.node) {
        [cell] = this.getParent(cell);
        continue;
      }

      if (balance > 1) {
        const leftsLeft = this.getLeftChild(leftChild);
        const leftsRight = this.getRightChild(leftChild);
        const leftBalance = this.getHeight(leftsLeft) - this.getHeight(leftsRight);

        if (leftBalance < 0) {
          await this.leftRotation(leftChild, animate);
          await this.rightRotation(cell, animate);
        } else {
          await this.rightRotation(cell, animate);
        }
      } else if (balance < -1) {
        const rightsLeft = this.getLeftChild(rightChild);
        const rightsRight = this.getRightChild(rightChild);
        const rightBalance = this.getHeight(rightsLeft) - this.getHeight(rightsRight);

        if (rightBalance > 0) {
          await this.rightRotation(rightChild, animate);
          await this.leftRotation(cell, animate);
        } else {
          await this.leftRotation(cell, animate);
        }
      }

      [cell] = this.getParent(cell);
    }
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
    this.setHeight(rotationRoot, this.getUpdatedHeight(rotationRoot));
    this.setHeight(newRoot, this.getUpdatedHeight(newRoot));

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

    this.setHeight(rotationRoot, this.getUpdatedHeight(rotationRoot));
    this.setHeight(newRoot, this.getUpdatedHeight(newRoot));

    if (animate) {
      await new Promise(r => setTimeout(r, 600));
    }
  }

  private getUpdatedHeight(cell: BstCell): number {
    const leftChild = this.getLeftChild(cell);
    const rightChild = this.getRightChild(cell);
    const leftHeight = this.getHeight(leftChild);
    const rightHeight = this.getHeight(rightChild);

    return 1 + Math.max(leftHeight, rightHeight);
  }

  private getHeight(cell: BstCell): number {
    const height: number | undefined = !!cell ? this.heights[cell.id] : -1;
    return height ?? -1;
  }

  private setHeight(cell: BstCell, height: number): void {
    if (!cell) {
      return;
    }
    this.heights[cell.id] = height;
    cell.addToDescriptor(`h=${height}`);
  }
}
