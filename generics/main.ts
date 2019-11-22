// 函数

const count = 1;

function countFuncCalled(func: (...args: any[]) => any) {}

// 包装类
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

const a = ref(20); // Ref<number>
const b = ref("233"); // Ref<string>

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

const c = getJSON<number>({ url: "abc.com" }); // Promise<number>
