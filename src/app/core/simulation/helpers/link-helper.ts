import {SimulationLink} from '../basics/simulation-link';
import {BstCell} from '../structures/tree/bst-cell';

export class LinkHelper {
  links: SimulationLink[] = [];

  addLink(source: BstCell, target: BstCell, yDisplacement = 0): SimulationLink {
    const link = new SimulationLink(source, target, yDisplacement);
    this.links.push(link);
    return link;
  }

  removeLink(source: BstCell, target: BstCell): void {
    if (!source || !target) {
      return;
    }
    const deletionIndex = this.links.findIndex((sl: SimulationLink) => sl.source.id === source.id && sl.target.id === target.id);
    if (deletionIndex !== -1) {
      this.links.splice(deletionIndex, 1);
    }
  }

  detachCompletely(target: BstCell): void {
    this.links = this.links.filter((sl: SimulationLink) => sl.source !== target && sl.target !== target);
  }
}
