export class PositionHelper {

  createRandomPointOnCircumference(center: [number, number], radius: number): [number, number] {
    const angle = Math.random() * Math.PI * 2;
    const x = Math.cos(angle) * Math.random() * radius;
    const y = Math.sin(angle) * Math.random() * radius;
    return [center[0] + x, center[1] + y];
  }

}
