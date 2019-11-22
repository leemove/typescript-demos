/** 函数返回工具泛型 */
type ReturenType<T> = T extends (...args: any[]) => infer P ? P : any;

type Sub = (a: number, b: number) => number;

type DateFormat = (date: string | Date) => string;

type AnyFunc = () => undefined;

type T0 = ReturnType<Sub>; // number
type T1 = ReturnType<DateFormat>; // string
type T2 = ReturnType<AnyFunc>; // undefined
