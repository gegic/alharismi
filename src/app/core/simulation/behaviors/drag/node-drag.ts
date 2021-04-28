import {DragBehavior} from './drag-behavior';
import {SimulationNode} from '../../basics/simulation-node';
import * as d3 from 'd3';
import {ArrayCell} from '../../structures/array/array-cell';
import {SimulationHandler} from '../../handlers/simulation-handler';
import {Selection} from 'd3-selection';

export class NodeDrag implements DragBehavior<SimulationNode> {

  simulationHandler: SimulationHandler;
  previouslyHoveredPlaceholders: Selection<any, any, any, any>[] = [];


  constructor(simulationHandler: SimulationHandler) {
    this.simulationHandler = simulationHandler;
  }

  dragStart(d: SimulationNode, i: number, nodes: Element[] | ArrayLike<Element>): void {
    if (d.isPlaceholder && d.lockedGraph.root !== d) {
      return;
    }
    d.dragStartX = d.x;
    d.dragStartY = d.y;
    d3.select('*').style('cursor', 'grabbing');
    d3.select(nodes[i]).raise();
    d3.selectAll('line').attr('pointer-events', 'none'); // remove hovering from all lines
    d.fx = d3.event.x;
    d.fy = d3.event.y;
    d3.select(nodes[i]).attr('pointer-events', 'none');
    d3.selectAll('.node')
      .filter(c => c !== d)
      .attr('pointer-events', 'none'); // remove hovering from all nodes except d

  }

  dragging(d: SimulationNode, i: number, nodes: Element[] | ArrayLike<Element>): void {
    const node = nodes[i] as SVGCircleElement;
    const circle = d3.select(node);
    if (d.isPlaceholder && d.lockedGraph.root !== d) {
      return;
    }
    this.previouslyHoveredPlaceholders.forEach(c => c.attr('fill', 'white'));
    this.previouslyHoveredPlaceholders = [];

    if (this.simulationHandler.draggedNode) {
      d = this.simulationHandler.draggedNode;
      if (!(d.isPlaceholder)) {
        // this.nodes.filter(c => c.isPlaceholder).some((n: SimulationNode) => {
        //   if (d === n) {
        //     return false;
        //   }
        //   const distance = Math.sqrt((d.x - n.x) * (d.x - n.x) + (d.y - n.y) * (d.y - n.y));
        //   if (d !== n && distance < d.radius + n.radius + 10) {
        //     if (d.lockedGraph !== n.lockedGraph &&
        //       n.lockedGraph.allowAddingChildToPlaceholder) {
        //       // const circleElement = d3.selectAll('circle').filter((c) => c === n);
        //       this.previouslyHoveredPlaceholders.push(circle);
        //       circle.attr('fill', '#228B22');
        //       return true;
        //     }
        //     return true;
        //   }
        // });
      }
      if (this.simulationHandler.draggedNode.hoveringGrid) {
        return;
      }
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    }
    this.simulationHandler.draggedNode = d;

  }

  dragEnd(d: SimulationNode, i: number, nodes: Element[] | ArrayLike<Element>): void {
    if (!d) {
      d3.selectAll('line').attr('pointer-events', 'auto');
      d3.selectAll('.node').attr('pointer-events', 'auto');
      this.simulationHandler.draggedNode = null;
      return;
    }

    if (d.isPlaceholder && d.lockedGraph.root !== d) {
      return;
    }

    d3.select('*').style('cursor', null);

    const distanceDragged = Math.sqrt(Math.pow(d3.event.x - d.dragStartX, 2) + Math.pow(d3.event.y - d.dragStartY, 2));

    d3.selectAll('circle')
      .filter((nd: SimulationNode) => nd.isPlaceholder)
      .attr('fill', 'white');

    d3.selectAll('line').attr('pointer-events', 'auto');
    d3.selectAll('.node').attr('pointer-events', 'auto');

    if (distanceDragged < 30) {
      // short drag, do nothing
      if (this.simulationHandler.draggedNode && !this.simulationHandler.draggedNode.lockedGrid) {
        d.fx = undefined;
        d.fy = undefined;
      }

      this.simulationHandler.draggedNode = null;
      d.clicked();
      return;
    }

    d3.select(nodes[i]).attr('pointer-events', 'auto');

    if (this.simulationHandler.draggedNode) {
      // are we dragging a node

      // TODO

      // if (this.simulationHandler.draggedNode.lockedGraph) {
      //   const tree = this.simulationHandler.draggedNode.lockedGraph;
      //   const treeNode = tree.d3tree.descendants().filter(n => n.data === d)[0];
      //
      //   if (treeNode) {
      //     treeNode
      //       .descendants()
      //       .filter((d: SimulationNode) => d.data !== draggedNode)
      //       .forEach(d => {
      //         // d.data.tree_x = d3.event.x + d.data.tree_x - draggedNode.tree_x
      //         d.data.tree_y = d3.event.y + d.data.tree_y - draggedNode.tree_y
      //       })
      //     // draggedNode.tree_x  = d3.event.x
      //     draggedNode.tree_y = d3.event.y
      //     if (tree.root === draggedNode) {
      //       tree.setTransform(d3.event.x, d3.event.y)
      //     }
      //   }
      // }
      const arrayCell = d3
        .selectAll('.array-cell-container')
        .data()
        .filter((ac: ArrayCell) => ac.isMouseOver)[0] as ArrayCell; // select array cell where mouse is hovering over

      if (arrayCell) {
        // is mouse hovering over an arraycell
        if (!arrayCell.node) {
          if (d.lockedGrid) {
            d.lockedGrid.removeNode();
          }
          console.log('ADDING A NODE');
          arrayCell.addNode(d);
          this.simulationHandler.repaint();
        } else if (arrayCell.node === d) {
          // do nothing
        } else if (arrayCell.node !== d) {
          if (d.lockedGrid) {
            d.lockedGrid.removeNode();
            this.simulationHandler.repaint();
          }
          arrayCell.removeNode();
          this.simulationHandler.repaint();
          arrayCell.addNode(d);
          this.simulationHandler.repaint();
        }
      } else {
        if (d.lockedGrid) {
          d.lockedGrid.removeNode();
          this.simulationHandler.repaint();
        }
        d.fx = undefined;
        d.fy = undefined;
      }

      if (!this.simulationHandler.draggedNode.isPlaceholder) {
        // this.nodes
        //   .filter((nd: SimulationNode) => nd.isPlaceholder)
        //   .some((nd: SimulationNode) => {
        //     // check if there is a nearby node where aciton can be performed.
        //     if (d === nd) {
        //       return false;
        //     }
        //     const distance = Math.sqrt((d.x - nd.x) * (d.x - nd.x) + (d.y - nd.y) * (d.y - nd.y));
        //     if (d !== nd && distance < d.radius + nd.radius) {
        //       if (d.lockedGraph !== nd.lockedGraph && nd.lockedGraph.allowAddingChildToPlaceholder) {
        //         // d3.selectAll('circle').filter((c: SimulationNode) => c === nd);
        //         const tree = nd.lockedGraph;
        //         // should handle this with in bst instead
        //         if (tree.root.isPlaceholder) {
        //
        //           const root = tree.root;
        //           if (d.lockedGraph) {
        //             d.lockedGraph.setTransform(tree.x, tree.y);
        //             // window.dataHandler.removeFigure(bst) TODO
        //             d.lockedGraph.RedBlackBST = tree.RedBlackBST;
        //           } else {
        //             tree.root = d;
        //             d.lockedGraph = d;
        //           }
        //           root.delete();
        //           tree.updateLinks();
        //           // repaint() TODO
        //         } else {
        //           const index = nd.parent.children.indexOf(nd);
        //           tree.addChild(d, nd.parent, index);
        //         }
        //
        //         return true;
        //         // do something
        //       }
        //     }
        //   });
      }
    }
    if (d) {
      d.setTransform(d3.event.x, d3.event.y);
      this.simulationHandler.repaint();
    }
    d3.selectAll('line').attr('pointer-events', 'auto');
    d3.selectAll('.node').attr('pointer-events', 'auto');
    if (this.simulationHandler.draggedNode && !this.simulationHandler.draggedNode.lockedGrid) {
      d.fx = undefined;
      d.fy = undefined;
    }
    this.simulationHandler.draggedNode = null;

  }

}
