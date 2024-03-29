import * as d3 from 'd3';
import {SimulationNode} from '../basics/simulation-node';

export class ColorProvider {
  colorScheme = d3.scaleLinear<string, d3.RGBColor>().domain([0, 0]).range(['#5d89a8', '#63ad82', '#a3699b']);

  setColorScheme(values: number[]): void {
    const currentMin = Math.min(...values);
    const currentMax = Math.max(...values);
    let [minimum, maximum] = this.colorScheme.domain();

    if (currentMin < minimum) {
      minimum = currentMin;
    }
    if (currentMax > maximum) {
      maximum = currentMax;
    }
    this.colorScheme = d3.scaleLinear<string, d3.RGBColor>().domain([minimum, maximum]).range(['#5d89a8', '#63ad82', '#a3699b']);
  }

  getNodeColor(node: SimulationNode): string {
    if (node.isPlaceholder) {
      return '#E2E8CE';
    }
    else if (!node.isValueVisible) {
      return 'grey';
    }
    else {
      return d3.color(this.colorScheme(node.value)).formatHex();
    }

  }
}
