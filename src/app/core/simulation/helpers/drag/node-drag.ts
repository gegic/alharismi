import {DragHelper} from './drag-helper';
import {SimulationNode} from '../../basics/simulation-node';
import * as d3 from 'd3';
import {Selection} from 'd3-selection';
import {ArrayCell} from '../../structures/array/array-cell';
import {SimulationArray} from '../../structures/array/simulation-array';
import {Simulation} from '../../simulation';
import {BstCell} from '../../structures/tree/bst-cell';

export class NodeDrag implements DragHelper<SimulationNode> {

  simulation: Simulation;
  previouslyHoveredPlaceholders: Selection<any, any, any, any>[] = [];

  constructor(simulation: Simulation) {
    this.simulation = simulation;
  }

  dragStart(d: SimulationNode, i: number, nodes: Element[] | ArrayLike<Element>): void {
    console.log('dragstart');

    d.dragStartX = d.x;
    d.dragStartY = d.y;
    d3.select('*').style('cursor', 'grabbing');
    d3.select(nodes[i]).raise();
    d3.selectAll('line').attr('pointer-events', 'none'); // remove hovering from all lines
    d.noCollision = true;
    d.pointerEvents = false;
    d.nodeOrder = 0;
    d.fx = d3.event.x;
    d.fy = d3.event.y;
    d.setTransform(d3.event.x, d3.event.y);
  }

  dragging(d: SimulationNode, i: number, nodes: Element[] | ArrayLike<Element>): void {

    if (this.simulation.loop.draggedNode) {
      // if (this.simulation.loop.draggedNode.hoveringPlaceholder) {
      //   return;
      // }
      if (this.simulation.loop.draggedNode.hoveringGrid) {
        return;
      }
      d.fx = d3.event.x;
      d.fy = d3.event.y;
      d.setTransform(d3.event.x, d3.event.y);
    }
    this.simulation.loop.draggedNode = d;


  }

  dragEnd(d: SimulationNode, i: number, nodes: Element[] | ArrayLike<Element>): void {
    if (!d) {
      d3.selectAll('line').attr('pointer-events', 'auto');
      d3.selectAll('.node').attr('pointer-events', 'auto');
      this.simulation.loop.draggedNode = null;
      return;
    }

    d3.select('*').style('cursor', null);

    const distanceDragged = Math.sqrt(Math.pow(d3.event.x - d.dragStartX, 2) + Math.pow(d3.event.y - d.dragStartY, 2));

    d3.selectAll('circle')
      .filter((nd: SimulationNode) => nd.isPlaceholder)
      .attr('fill', '#E2E8CE');

    d3.selectAll('line').attr('pointer-events', 'auto');
    d3.selectAll('.node').attr('pointer-events', 'auto');

    if (distanceDragged < 30) {
      // short drag, do nothing
      if (!d.lockedGrid && !d.lockedPlaceholder) {
        d.noCollision = false;
        d.pointerEvents = true;
        d.nodeOrder = 1;
        d.fx = undefined;
        d.fy = undefined;
      }

      this.simulation.loop.draggedNode = null;
      return;
    }

    d3.select(nodes[i]).attr('pointer-events', 'auto');

    if (this.simulation.loop.draggedNode) {

      // are we dragging a node

      // TODO

      // if (this.simulation.simulationLoop.draggedNode.lockedGraph) {
      //   const tree = this.simulation.simulationLoop.draggedNode.lockedGraph;
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
          arrayCell.addNode(d);
          // this.simulation.simulationLoop.repaint();
        } else if (arrayCell.node === d) {
          // do nothing
        } else if (arrayCell.node !== d) {
          if (d.lockedGrid) {
            d.lockedGrid.removeNode();
            // this.simulation.simulationLoop.repaint();
          }
          arrayCell.removeNode();
          // this.simulation.simulationLoop.repaint();
          arrayCell.addNode(d);
          // this.simulation.simulationLoop.repaint();
        }
      } else {
        if (d.lockedGrid) {
          d.lockedGrid.removeNode();
          // this.simulation.simulationLoop.repaint();
        }
        d.fx = undefined;
        d.fy = undefined;
      }

      const bstCell = d3.selectAll('.bst-cell-circle')
        .data()
        .filter((bc: BstCell) => bc.isMouseOver)[0] as BstCell;

      if (bstCell && !bstCell.node &&
        (!d.lockedPlaceholder || bstCell.tree !== d.lockedPlaceholder.tree)) {
        bstCell.tree.add(d, bstCell);
      }
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
      //           const index = nd.parent.childrenidOf(nd);
      //           tree.addChild(d, nd.parent, index);
      //         }
      //
      //         return true;
      //         // do something
      //       }
      //     }
      //   });
    }

    d.setTransform(d3.event.x, d3.event.y);
    d3.selectAll('line').attr('pointer-events', 'auto');
    d3.selectAll('.node').attr('pointer-events', 'auto');
    if (!d.lockedGrid && !d.lockedPlaceholder) {
      console.log('NONONO');
      d.noCollision = false;
      d.pointerEvents = true;
      d.nodeOrder = 1;
      d.fx = undefined;
      d.fy = undefined;
    }
    this.simulation.loop.draggedNode = null;

  }

  addDragInteraction(element: d3.Selection<d3.BaseType, SimulationNode, any, any>): d3.Selection<d3.BaseType, SimulationNode, any, any> {
    const drag = d3.drag<Element, SimulationNode, unknown>()
      .on('start', (d: SimulationNode, i: number, nodes: Element[] | ArrayLike<Element>) => this.dragStart(d, i, nodes))
      .on('drag', (d: SimulationNode, i: number, nodes: Element[] | ArrayLike<Element>) => this.dragging(d, i, nodes))
      .on('end', (d: SimulationNode, i: number, nodes: Element[] | ArrayLike<Element>) => this.dragEnd(d, i, nodes));

    element.call(drag);

    return element;
  }

}
