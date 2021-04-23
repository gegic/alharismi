import {SimulationNode} from '../../basics/simulation-node';
import * as d3 from 'd3';
import {SimulationLink} from '../../basics/simulation-link';
import {SimulationGraph} from './simulation-graph';

export class BinarySearchTree extends SimulationGraph{
  root: SimulationNode;
  d3Tree: d3.HierarchyNode<SimulationNode>;
  x: number;
  y: number;

  z = -3;
  width = 500;
  height = 500;
  allowAddingChildToPlaceholder = true;

  constructor(root: SimulationNode) {
    super();
  }
}
