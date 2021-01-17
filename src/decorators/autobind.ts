export const AutoBind = (
  _: any,
  _1: string,
  descriptor: PropertyDescriptor
) => {
  const originalMethod = descriptor.value;
  const boundFunction: PropertyDescriptor = {
    enumerable: false,
    configurable: true,
    get() {
      return originalMethod.bind(this);
    },
  };
  return boundFunction;
};
