import {d3Element, MouseBehavior} from './mouse-behavior';
import {SimulationNode} from '../../basics/simulation-node';
import * as d3 from 'd3';
import {defaultRadius} from '../../../consts';

export class NodeMouse implements MouseBehavior<SimulationNode> {

  mouseOver(d: SimulationNode, i: number, nodes: d3Element[] | ArrayLike<d3Element>): void {
    const circle = d3.select(nodes[i]);

    if (!d.isInteractable) {
      return;
    }

    circle
      .select('.node-circle')
      .transition()
      .duration(1000)
      .ease(d3.easeElastic)
      .attr('r', defaultRadius + 10);
  }

  mouseOut(d: SimulationNode, i: number, nodes: d3Element[] | ArrayLike<d3Element>): void {
    const circle = d3.select(nodes[i]);

    if (!d.isInteractable) {
      return;
    }

    circle
      .select('.node-circle')
      .transition()
      .duration(1000)
      .ease(d3.easeElastic)
      .attr('r', defaultRadius);
  }


}
