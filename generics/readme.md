# 泛型

泛型作为面向对象语言的一种常用功能,在typescript中同样也举足轻重.存在着许多应用场景.

## 根据参数设定函数的返回值

```ts
function log<T>(item: T): T {
    console.log(item)
    return item;
}


const a1 = log(233) // 233
const a2 = log(Math.random()) // number
const a3 = log(Symbol('233')) // symbol


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
```

这个函数的返回类型和输入类型为动态的,返回类型永远等于输入类型.避免了我们出现以下代码

```ts
function logString(item: string): string {
    console.log(item)
    return item
}

function logNumber(item: number): number {
    console.log(item)
    return item
}

// function logObject.....
```