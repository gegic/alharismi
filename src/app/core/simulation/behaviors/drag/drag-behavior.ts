
export interface DragBehavior<SimulationObject> {
  dragStart(d: SimulationObject, i: number, objs: Element[] | ArrayLike<Element>): void;
  dragging(d: SimulationObject, i: number, objs: Element[] | ArrayLike<Element>): void;
  dragEnd(d: SimulationObject, i: number, objs: Element[] | ArrayLike<Element>): void;
}
