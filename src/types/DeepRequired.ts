/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-object-type */

/**
 * @see https://github.com/piotrwitek/utility-types/blob/2491e464b9adfa88ff9f799e4fd151aa25b71249/src/mapped-types.ts
 */

export type DeepRequired<T> = T extends (...args: any[]) => any
  ? T
  : T extends any[]
    ? _DeepRequiredArray<T[number]>
    : T extends object
      ? _DeepRequiredObject<T>
      : T;

interface _DeepRequiredArray<T> extends Array<DeepRequired<NonUndefined<T>>> {}

type _DeepRequiredObject<T> = {
  [P in keyof T]-?: DeepRequired<NonUndefined<T[P]>>;
};

type NonUndefined<A> = A extends undefined ? never : A;
