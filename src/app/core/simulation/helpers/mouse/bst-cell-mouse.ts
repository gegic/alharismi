import {d3Element, MouseHelper} from './mouse-helper';
import {SimulationLoop} from '../../handlers/simulation-loop';
import {MenuItem} from 'd3-context-menu';
import * as d3 from 'd3';
import {Simulation} from '../../simulation';
import {BstCell} from '../../structures/tree/bst-cell';
import {ColorProvider} from '../../providers/color-provider';

export class BstCellMouse implements MouseHelper<BstCell> {

  colorProvider: ColorProvider;
  simulation: Simulation;

  constructor(simulation: Simulation,
              colorProvider: ColorProvider) {
    this.simulation = simulation;
    this.colorProvider = colorProvider;
  }

  mouseOver(d: BstCell, i: number, nodes: d3Element[] | ArrayLike<d3Element>): void {
    d.isMouseOver = true;

    const draggedNode = this.simulation.loop.draggedNode;
    const innerNode = d.node;
    const treeValid = d.graph.isValid;

    let color: string;

    if (!treeValid) {
      color = '#8d1a1a';
    } else if (!!innerNode) {
      color = this.colorProvider.getNodeColor(innerNode);
    } else if (!!draggedNode) {
      color = this.colorProvider.getNodeColor(draggedNode);
    } else {
      color = '#ACBFA4';
    }

    d3.select(nodes[i])
      .select('.bst-cell-circle')
      .style('stroke', color)
      .transition()
      .duration(600)
      .ease(d3.easeElastic)
      .style('stroke-width', 7);

    if (!draggedNode || !!innerNode || !treeValid) {
      return;
    }

    this.simulation.loop.draggedNode.hoveringPlaceholder = d;

    d.hoveringNode = this.simulation.loop.draggedNode;
  }

  mouseOut(d: BstCell, i: number, nodes: d3Element[] | ArrayLike<d3Element>): void {

    d.isMouseOver = false;

    d3.select(nodes[i])
      .select('.bst-cell-circle')
      .transition()
      .duration(600)
      .ease(d3.easeElastic)
      .style('stroke-width', 0);

    const draggedNode = this.simulation.loop.draggedNode;
    const innerNode = d.node;
    const treeValid = d.graph.isValid;

    if (!draggedNode || !!innerNode || !treeValid) {
      return;
    }
    if (d.hoveringNode !== d.node) {
      d.hoveringNode = d.node;
    }
    else {
      d.hoveringNode = undefined;
    }

    this.simulation.loop.draggedNode.hoveringPlaceholder = null;


  }

  addMouseInteraction(element: d3.Selection<d3.BaseType, BstCell, any, any>): d3.Selection<d3.BaseType, BstCell, any, any> {

    if (!this.simulation.interactable) {
      return element;
    }

    element
      .on('mouseover', (d: BstCell, i: number, nodes: d3Element[] | ArrayLike<d3Element>) => this.mouseOver(d, i, nodes))
      .on('mouseout', (d: BstCell, i: number, nodes: d3Element[] | ArrayLike<d3Element>) => this.mouseOut(d, i, nodes));

    return element;
  }

}
