export const hasProperty = <Obj, Prop extends string>(
  obj: Obj,
  prop: Prop,
): obj is Obj & Record<Prop, unknown> => Object.prototype.hasOwnProperty.call(obj, prop)
