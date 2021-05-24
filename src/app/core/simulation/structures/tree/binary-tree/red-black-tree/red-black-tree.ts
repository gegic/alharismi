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
    this.setColor(cell, Color.BLACK);
  }

  async add(d: SimulationNode, bstCell: BstCell): Promise<void> {
    await super.add(d, bstCell);
    this.setColor(bstCell, Color.RED);

    this.insertionCheckBalance(bstCell);
  }

  async delete(value: number): Promise<[SimulationNode, BstCell | null, BstCell]> {
    const [node, affectedCell, deletedCell] = await super.delete(value);

    this.deletionCheckBalance(affectedCell, deletedCell);
    return [node, affectedCell, deletedCell];
  }


  /**
   * Used to check balance of the tree after insertion.
   * Checks the colors of the starting cell and its ancestors if necessary, thus checking if all the nodes are balanced.
   * If an unbalanced node shows up, performs operations of balancing.
   * @param cell - The starting cell.
   * @private
   */
  private insertionCheckBalance(cell: BstCell): void {
    const upTreeGenerator = this.upTree(cell);
    let iterator = upTreeGenerator.next();

    while (!iterator.done) {
      let [currentCell, parent, childIndex]: [BstCell, BstCell, number] = iterator.value;
      let [grandParent, parentIndex] = this.getParent(parent);
      if (currentCell.isRoot || this.getColor(parent) !== Color.RED) {
        break;
      }

      if (parentIndex === 0) {
        const uncle = this.getRightChild(grandParent);
        if (this.getColor(uncle) === Color.RED) {
          // uncle is red
          this.setColor(parent, Color.BLACK);
          this.setColor(uncle, Color.BLACK);
          this.setColor(grandParent, Color.RED);
          // skip the parent cell
          upTreeGenerator.next();
          // go to the grandparent cell
          iterator = upTreeGenerator.next();
        } else {
          // uncle is black
          if (childIndex === 1) {
            // currentCell is the right child
            iterator = upTreeGenerator.next();
            [currentCell, parent, childIndex] = iterator.value;
            [grandParent, parentIndex] = this.getParent(parent);
            this.leftRotation(currentCell);
          }
          this.setColor(parent, Color.BLACK);
          this.setColor(grandParent, Color.RED);
          this.rightRotation(grandParent);
        }
      } else {
        const uncle = this.getLeftChild(grandParent);
        if (this.getColor(uncle) === Color.RED) {
          // uncle is red
          this.setColor(parent, Color.BLACK);
          this.setColor(uncle, Color.BLACK);
          this.setColor(grandParent, Color.RED);
          // skip the parent cell
          upTreeGenerator.next();
          // go to the grandparent cell
          iterator = upTreeGenerator.next();
        } else {
          // uncle is black
          if (childIndex === 0) {
            // currentCell is the left child
            iterator = upTreeGenerator.next();
            [currentCell, parent, childIndex] = iterator.value;
            [grandParent, parentIndex] = this.getParent(parent);
            this.rightRotation(currentCell);
          }
          this.setColor(parent, Color.BLACK);
          this.setColor(grandParent, Color.RED);
          this.leftRotation(grandParent);
        }
      }
    }

    const treeRoot = this.getRoot();
    this.setColor(treeRoot, Color.BLACK);
  }

  /**
   * Used to check balance of the tree after deletion.
   */
  deletionCheckBalance(affectedCell: BstCell, deletedCell: BstCell): void {
    const upTreeGenerator = this.upTree(affectedCell);
    let iterator = upTreeGenerator.next();

    let [currentCell, parent, childIndex]: [BstCell, BstCell, number] = iterator.value;
    iterator.value = [deletedCell, parent, childIndex];

    while (!iterator.done) {
      [currentCell, parent, childIndex] = iterator.value;
      if (currentCell.isRoot || this.getColor(currentCell) === Color.RED) {
        break;
      }
      if (childIndex === 0) {
        // if currentCell is a left node to its parent
        let sibling = this.getRightChild(parent);
        const siblingsColor = this.getColor(sibling);
        if (siblingsColor && siblingsColor === Color.RED) {
          this.setColor(sibling, Color.BLACK);
          this.setColor(parent, Color.RED);
          this.leftRotation(parent);
          sibling = this.getRightChild(parent);
        }
        const leftNephew = this.getLeftChild(sibling);
        let rightNephew = this.getRightChild(sibling);
        const leftNephewColor = this.getColor(leftNephew);
        const rightNephewColor = this.getColor(rightNephew);
        if (leftNephewColor && leftNephewColor === Color.BLACK
          && rightNephewColor && rightNephewColor === Color.BLACK) {
          this.setColor(sibling, Color.RED);
          iterator = upTreeGenerator.next();
        } else {
          if (rightNephewColor === Color.BLACK) {
            this.setColor(leftNephew, Color.BLACK);
            this.setColor(sibling, Color.RED);
            this.rightRotation(sibling);
            sibling = this.getRightChild(parent);
            rightNephew = this.getRightChild(sibling);
          }
          const parentColor = this.getColor(parent);
          this.setColor(sibling, parentColor);
          this.setColor(parent, Color.BLACK);
          this.setColor(rightNephew, Color.BLACK);
          this.leftRotation(parent);
          iterator = {value: [this.getRoot(), null, 0], done: true};
        }
      } else {
        // if currentCell is a right node to its parent
        let sibling = this.getLeftChild(parent);
        const siblingsColor = this.getColor(sibling);
        if (siblingsColor && siblingsColor === Color.RED) {
          this.setColor(sibling, Color.BLACK);
          this.setColor(parent, Color.RED);
          this.rightRotation(parent);
          sibling = this.getLeftChild(parent);
        }
        const rightNephew = this.getRightChild(sibling);
        let leftNephew = this.getLeftChild(sibling);
        const rightNephewColor = this.getColor(rightNephew);
        const leftNephewColor = this.getColor(leftNephew);
        if (rightNephewColor && rightNephewColor === Color.BLACK
          && leftNephewColor && leftNephewColor === Color.BLACK) {
          this.setColor(sibling, Color.RED);
          iterator = upTreeGenerator.next();
        } else {
          if (leftNephewColor === Color.BLACK) {
            this.setColor(rightNephew, Color.BLACK);
            this.setColor(sibling, Color.RED);
            this.leftRotation(sibling);
            sibling = this.getLeftChild(parent);
            leftNephew = this.getLeftChild(sibling);
          }
          const parentColor = this.getColor(parent);
          this.setColor(sibling, parentColor);
          this.setColor(parent, Color.BLACK);
          this.setColor(leftNephew, Color.BLACK);
          this.rightRotation(parent);
          iterator = {value: [this.getRoot(), null, 0], done: true};
        }
      }
    }
    const finalCell = iterator.value[0];
    this.setColor(finalCell, Color.BLACK);
  }

  private leftRotation(rotationRoot: BstCell): void {
    const newRoot = this.getRightChild(rotationRoot);
    const t = this.getLeftChild(newRoot);
    // Perform rotation

    let removeIndex = this.links.findIndex((sl: SimulationLink) => sl.source === newRoot && sl.target === t);
    if (removeIndex !== -1) {
      this.links.splice(removeIndex, 1);
    }
    this.setRightChild(rotationRoot, t);
    this.links.push(new SimulationLink(rotationRoot, t));

    const [rootParent, childIndex] = this.getParent(rotationRoot);
    this.detachParent(rotationRoot);
    removeIndex = this.links.findIndex((sl: SimulationLink) => sl.source === rootParent && sl.target === rotationRoot);
    if (removeIndex !== -1) {
      this.links.splice(removeIndex, 1);
    }
    if (!rootParent) {
      newRoot.isRoot = true;
      newRoot.descriptor = rotationRoot.descriptor;
      rotationRoot.isRoot = false;
    }
    if (childIndex === 0) {
      this.setLeftChild(rootParent, newRoot);
    } else {
      this.setRightChild(rootParent, newRoot);
    }
    if (!!rootParent) {
      this.links.push(new SimulationLink(rootParent, newRoot));
    }

    removeIndex = this.links.findIndex((sl: SimulationLink) => sl.source === rotationRoot && sl.target === newRoot);
    if (removeIndex !== -1) {
      this.links.splice(removeIndex, 1);
    }
    this.setLeftChild(newRoot, rotationRoot);
    this.links.push(new SimulationLink(newRoot, rotationRoot));

    this.alignForces();
  }

  private rightRotation(rotationRoot: BstCell): void {
    const newRoot = this.getLeftChild(rotationRoot);
    const t = this.getRightChild(newRoot);
    // Perform rotation

    let removeIndex = this.links.findIndex((sl: SimulationLink) => sl.source === newRoot && sl.target === t);
    if (removeIndex !== -1) {
      this.links.splice(removeIndex, 1);
    }
    this.setLeftChild(rotationRoot, t);
    this.links.push(new SimulationLink(rotationRoot, t));

    const [rootParent, childIndex] = this.getParent(rotationRoot);
    this.detachParent(rotationRoot);
    removeIndex = this.links.findIndex((sl: SimulationLink) => sl.source === rootParent && sl.target === rotationRoot);
    if (removeIndex !== -1) {
      this.links.splice(removeIndex, 1);
    }
    if (!rootParent) {
      newRoot.isRoot = true;
      newRoot.descriptor = rotationRoot.descriptor;
      rotationRoot.isRoot = false;
    }
    if (childIndex === 0) {
      this.setLeftChild(rootParent, newRoot);
    } else {
      this.setRightChild(rootParent, newRoot);
    }
    if (!!rootParent) {
      this.links.push(new SimulationLink(rootParent, newRoot));
    }

    removeIndex = this.links.findIndex((sl: SimulationLink) => sl.source === rotationRoot && sl.target === newRoot);
    if (removeIndex !== -1) {
      this.links.splice(removeIndex, 1);
    }
    this.setRightChild(newRoot, rotationRoot);
    this.links.push(new SimulationLink(newRoot, rotationRoot));

    this.alignForces();
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
    this.colors[cell.id] = color;
    cell.color = color;
  }
}
