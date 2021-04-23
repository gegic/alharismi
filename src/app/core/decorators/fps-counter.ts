export const fpsCounter = (interval: number) => {
  let t0 = Date.now();
  const fpsInterval = 1000 / interval;

  return (target: any, key: string | symbol, descriptor: PropertyDescriptor) => {
    const original = descriptor.value;
    descriptor.value = (...args: any[]) => {
      const t1 = Date.now();
      const elapsed = t1 - t0;
      let res: unknown;
      if (elapsed > fpsInterval) {
        res = original.apply();
        t0 = t1 - (elapsed / fpsInterval);
      } else {
        res = null;
      }
      return res;
    };
  };
}
