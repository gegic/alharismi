export class PositionHelper {

  createRandomPointOnCircumference(center: [number, number], radius: number): [number, number] {
    const angle = Math.random() * Math.PI * 2;
    const x = Math.cos(angle) * Math.random() * radius;
    const y = Math.sin(angle) * Math.random() * radius;
    return [center[0] + x, center[1] + y];
  }

  placeInsideBBox(bbox: DOMRect, position: [number, number]): [number, number] {
    if (position[1] > bbox.top) {
      position[1] = bbox.top;
    }
    if (position[1] < bbox.bottom) {
      position[1] = bbox.bottom;
    }
    if (position[0] > bbox.right) {
      position[0] = bbox.right;
    }
    if (position[0] < bbox.left) {
      position[0] = bbox.left;
    }
    return position;
  }
}
