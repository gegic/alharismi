// import {SimulationNode} from '../../../basics/simulation-node';
// import {BstCell} from '../bst-cell';
// import {BinarySearchTree} from '../binary-search-tree/binary-search-tree';
//
// export class AvlTree extends BinarySearchTree {
//
//   heights: { [cell: number]: number; } = {};
//
//
//   constructor(id: number, x: number, y: number) {
//     super(id, x, y);
//   }
//
//   addCell(cell: BstCell, parent: BstCell, right = true): [BstCell, number] {
//     const ret = super.addCell(cell, parent, right);
//
//
//
//     return ret;
//   }
//
//   async insert(node: SimulationNode): Promise<void> {
//     await super.insert(node);
//
//
//   }
//
//   private updateHeights(cell: BstCell): void {
//     const upTreeGenerator = this.upTree(cell);
//     let iterator = upTreeGenerator.next();
//     if (iterator.done) {
//       this.heights[cell.id] = -1;
//       return;
//     }
//
//     while (!iterator.done) {
//       const currentCell: BstCell = iterator.value;
//
//       if (!this.heights[currentCell.id]) {
//         this.heights[currentCell.id] = -1;
//         iterator = upTreeGenerator.next();
//         continue;
//       }
//
//       const leftChild = this.getLeftChild(currentCell);
//       const rightChild = this.getRightChild(currentCell);
//       const leftHeight = this.heights[leftChild.id];
//       const rightHeight = this.heights[rightChild.id];
//
//       this.heights[currentCell.id] = 1 + Math.max(leftHeight, rightHeight);
//
//       iterator = upTreeGenerator.next();
//     }
//   }
// }
