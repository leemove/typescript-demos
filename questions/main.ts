interface Action<T> {
  payload?: T;
  type: string;
}

class EffectModule {
  count = 1;
  message = "hello!";
  delay(input: Promise<any>) {
    return input.then(i => ({
      payload: `hello ${i}!`,
      type: "delay"
    }));
  }
  setMessage(action: Action<Date>) {
    return {
      payload: action.payload!.getMilliseconds(),
      type: "set-message"
    };
  }
}


// 修改 Connect 的类型，让 connected 的类型变成预期的类型
type Connect = (module:EffectModule ) => any



// type Connect = (
//   module: EffectModule
// ) => {
//   [T in FunctionPropertyNames<EffectModule>]: resolveEffectModuleFunc<
//     EffectModule[T]
//   >;
// };

// type FunctionPropertyNames<T> = {
//   [K in keyof T]: T[K] extends Function ? K : undefined;
// }[keyof T];


// type resolveEffectModuleFunc<T> = T extends (
//   input: Promise<infer U>
// ) => Promise<Action<infer V>>
//   ? (input: U) => Action<V>
//   : T extends (action: Action<infer U>) => Action<infer V>
//   ? (action: U) => Action<V>
//   : never;

const connect: Connect = m => ({
  delay: (input: number) => ({
    type: "delay",
    payload: `hello 2`
  }),
  setMessage: (input: Date) => ({
    type: "set-message",
    payload: input.getMilliseconds()
  })
});

type Connected = {
  delay(input: number): Action<string>;
  setMessage(action: Date): Action<number>;
};

export const connected = connect(new EffectModule());
