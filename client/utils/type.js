// Used to compare React instance of because of hot react loader and transpile inconsistencies

export function isInstanceOfComponent(object, base) {
  const isPrototypeOf = base.isPrototypeOf
    ? Object.prototype.isPrototypeOf.call(object.type)
    : false;
  const isEqualTo = object.type === base;
  return isPrototypeOf || isEqualTo;
}
