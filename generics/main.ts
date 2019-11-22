// 函数动态设定类型
function log<T>(item: T): T {
  console.log(item);
  return item;
}

const a1 = log(233); // 233
const a2 = log(Math.random()); // number
const a3 = log(Symbol("233")); // symbol

function getFirstItem<T>(list: T[]): T | null {
  return list.length > 0 ? list[0] : null;
}

const a4 = getFirstItem([3]); // number

/** 投放计划 */
class Plan {
  id: number;
  date: string;
}

const planList: Plan[] = [
  { id: 0, date: "2019/1/1" },
  { id: 1, date: "2019/1/2" }
];

const a5 = getFirstItem(planList); // Plan

//
// 包装类

// Vue3源码中的容器类
class Ref<T> {
  isRef: boolean;
  value: T;
}

function ref<T>(value: T): Ref<T> {
  return {
    isRef: true,
    value: value
  };
}

const b1 = ref(20); // Ref<number>
const b2 = ref("233"); // Ref<string>

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

// 类型推断

type D1 = <T>(
  arg: T
) => T extends string ? string : T extends number ? number : any;

// 实现类型
const getType: D1 = function(params: any) {
  if (typeof params === "string") return Math.random().toString();
  if (typeof params === "number") return Math.random();
  return params;
};
