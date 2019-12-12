/** 函数返回工具泛型 */
type ReturenType<T> = T extends (...args: any[]) => infer P ? P : any;

type Sub = (a: number, b: number) => number;

type DateFormat = (date: string | Date) => string;

type AnyFunc = () => undefined;

type A0 = ReturnType<Sub>; // number
type A1 = ReturnType<DateFormat>; // string
type A2 = ReturnType<AnyFunc>; // undefined

interface Ref<T> {
  _isRef: true;
  value: UnwrapRef<T>;
}




type IterableCollections = Map<any, any> | Set<any>;
type WeakCollections = WeakMap<any, any> | WeakSet<any>;
type CollectionTypes = IterableCollections | WeakCollections;


type UnwrapRef<T> = {
  ref: T extends Ref<infer V> ? UnwrapRef<V> : T;
  array: T extends Array<infer V> ? Array<UnwrapRef<V>> : T;
  object: { [K in keyof T]: UnwrapRef<T[K]> };
}[T extends Ref<any>
  ? "ref"
  : T extends Array<any>
  ? "array"
  : T extends Function | CollectionTypes
  ? "ref" // bail out on types that shouldn't be unwrapped
  : T extends object
  ? "object"
  : "ref"];

type B0 = UnwrapRef<number>; // number
type B1 = UnwrapRef<Ref<number>>; // number
type B2 = UnwrapRef<Array<Ref<string>>>; // string[]
type B3 = UnwrapRef<{ name: string; age: Ref<number> }>; // {name: string;age: number;}
type B4 = UnwrapRef<Map<string, number>>;

type ParamsType<T> = T extends (...args: infer V) => any ? V : any;

type C0 = ParamsType<(name: string, age: number) => void>; // (name: string, age: number) => void
