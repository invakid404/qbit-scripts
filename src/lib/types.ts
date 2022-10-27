type CapitalizeFirst<Value extends string> = Capitalize<Lowercase<Value>>;

type CamelCaseRec<Value extends string> =
  Value extends `${infer First}_${infer Rest}`
    ? `${CapitalizeFirst<First>}${CamelCaseRec<Rest>}`
    : CapitalizeFirst<Value>;

export type CamelCase<S extends string> = Uncapitalize<CamelCaseRec<S>>;

export type ToCamelCase<T> = {
  [Key in keyof T as Key extends string ? CamelCase<Key> : never]: T[Key];
};
