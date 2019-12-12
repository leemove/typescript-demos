//-----------------------------------------------
// 函数动态设定类型
function log<T>(item: T): T {
  console.log(item);
  return item;
}

const a1 = log(233); // 233
const a2 = log(Math.random()); // number
const a3 = log(Symbol("233")); // symbol

// lodash中克隆的类似类型声明
function clone<T> (source: T) {
  return JSON.parse(JSON.stringify(source)) as T
}

const a4 = clone(Symbol("233"))// symbol

// 有时候我们获取select列表的时候 需要获取第一个元素 设置成默认选中状态
function getFirstItem<T>(list: T[]): T | null {
  return list.length > 0 ? list[0] : null;
}

const a5 = getFirstItem([3]); // number

/** 投放计划 */
class Plan {
  id: number;
  date: string;
  spell: number;
}

const planList: Plan[] = [
  { id: 0, date: "2019/1/1", spell: 2 },
  { id: 1, date: "2019/1/2", spell: 2 }
];

const a6 = getFirstItem(planList); // Plan


// ---------------------------------------------

// 类型签名
function getJSON<T>(config: {
  url: string;
  headers?: { [key: string]: string };
}): Promise<T> {
  const fetchConfig = {
    method: "GET",
    Accept: "application/json",
    "Content-Type": "application/json",
    ...(config.headers || {})
  };
  return fetch(config.url, fetchConfig).then(
    response => response.json() as Promise<T>
  );
}

const c1 = getJSON<number>({ url: "abc.com" }); // Promise<number>

//-----------------------------------------------

// 包装类

// Vue3源码中的容器类
class Ref<T> {
  _isRef: boolean;
  value: T;
}

function ref<T>(value: T): Ref<T> {
  return {
    _isRef: true,
    value: value
  };
}

const b1 = ref(20); // Ref<number>
const b2 = ref("233"); // Ref<string>


// 类型推断

type D1 = <T>(
  arg: T
) => T extends string ? number : T extends number ? string : any;

// 实现类型
const getType: D1 = function(params: any) {
  if (typeof params === "string") return Math.random();
  if (typeof params === "number") return Math.random().toString();
  return params;
};

const D2 = getType(2) // string
const D3 = getType('3') // string

// 复杂情况的类型推断

type B = {name: string} ['name'] //string

type Arrlize<T> = {
  string: Array<string>;
  number: Array<number>;
  date: Array<Date>;
  self: T;
  any: Array<any>;
}[T extends string
  ? "string"
  : T extends number
  ? "number"
  : T extends Date
  ? "date"
  : T extends Array
  ? "self"
  : "any"];

type F1 = Arrlize<2>; // Array<string>
type F2 = Arrlize<1>; // Array<number>
type F3 = Arrlize<Date>; // Array<Date>
type F4 = Arrlize<string[]>; // Array<string>
type F5 = Arrlize<number[]>; //  Array<number>