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
    d3.select('*').style('cursor', 'grabbing');
    d3.select(nodes[i]).raise();
    d3.selectAll('line').attr('pointer-events', 'none'); // remove hovering from all lines
    d.noCollision = true;
    d.pointerEvents = false;
    d.nodeOrder = 0;
    d.dragStartX = d.x;
    d.dragStartY = d.y;
    d.move(d3.event.x, d3.event.y);
    // d.setTransform(d3.event.x, d3.event.y);
  }

  dragging(d: SimulationNode, i: number, nodes: Element[] | ArrayLike<Element>): void {

    d.move(d3.event.x, d3.event.y);
    // d.setTransform(d3.event.x, d3.event.y);
    this.simulation.loop.draggedNode = d;

  }

  dragEnd(d: SimulationNode, i: number, nodes: Element[] | ArrayLike<Element>): void {
    // if (!d) {
    //
    //   d3.selectAll('line').attr('pointer-events', 'auto');
    //   d3.selectAll('.node').attr('pointer-events', 'auto');
    //   this.simulation.loop.draggedNode = null;
    //   return;
    // }

    d3.select('*').style('cursor', null);
    d3.selectAll('line').attr('pointer-events', 'auto');
    d3.selectAll('.node').attr('pointer-events', 'auto');

    const distanceDragged = Math.sqrt(Math.pow(d3.event.x - d.dragStartX, 2) + Math.pow(d3.event.y - d.dragStartY, 2));

    if (distanceDragged < 30 && !d.lockedGrid && !d.lockedPlaceholder) {
      // short drag, do nothing
      this.freeUpNode(d);

      this.simulation.loop.draggedNode = null;
      return;
    }

    if (this.simulation.loop.draggedNode) {
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
        } else if (arrayCell.node !== d) {
          // if (d.lockedGrid) {
          //   d.lockedGrid.removeNode();
          //   // this.simulation.simulationLoop.repaint();
          // }
          // arrayCell.removeNode();
          // arrayCell.addNode(d);
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

      if (bstCell &&
        !bstCell.node &&
        bstCell.graph.isValid &&
        (!d.lockedPlaceholder || bstCell.graph !== d.lockedPlaceholder.graph)) {
        bstCell.graph.add(d, bstCell);
      }
    }
    d.setTarget(d3.event.x, d3.event.y);
    d3.selectAll('line').attr('pointer-events', 'auto');
    d3.selectAll('.node').attr('pointer-events', 'auto');

    this.freeUpNode(d);

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

  private freeUpNode(d: SimulationNode): void {
    if (!d.lockedGrid && !d.lockedPlaceholder) {
      d.noCollision = false;
      d.pointerEvents = true;
      d.nodeOrder = 1;
      d.fx = undefined;
      d.fy = undefined;
    } else if (d.lockedGrid) {
      d.noCollision = true;
      d.pointerEvents = true;
      d.nodeOrder = 2;
      d.move(d.lockedGrid.parent.x + d.lockedGrid.x + d.lockedGrid.width / 2, d.lockedGrid.height / 2 + d.lockedGrid.parent.y);
    } else if (d.lockedPlaceholder) {
      d.noCollision = true;
      d.pointerEvents = false;
      d.nodeOrder = 2;
    }
  }

}
