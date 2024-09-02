import { FC, ReactNode } from 'react'

export type Nullable<T> = T | null | undefined
export type MaybeNull<T> = T | null
export type MaybeNullStr<T> = T | 'None'
export type MaybeUndefined<T> = T | undefined

export type NumericalString = `${number}`

// todo: переиспользовать
export type SetNonNullable<BaseType, Keys extends keyof BaseType = keyof BaseType> = Required<{
  [Key in Keys]: Key extends Keys ? NonNullable<BaseType[Key]> : BaseType[Key]
}>

export type FalsyValue = false | '' | 0 | null | undefined
export type IsTruthyType<T> = T extends FalsyValue ? never : T

export type BooleanMap<Key extends string> = Record<Key, boolean>
export type BooleanKey<Key extends string> = `is${Key}`

export type StringMap<Key extends string> = Record<Key, string>

export type FCWithChildren<P = unknown> = FC<P & { children: ReactNode }>

export type AnyFn = (...args: any) => any
export type EmptyFn = () => void

export type NumberOrString = number | string

export type ArrayFirst<T extends any[] | readonly any[]> = T['length'] extends 0 ? never : T[0]

export type Writeable<T> = { -readonly [P in keyof T]: T[P] }
export type DeepWriteable<T> = { -readonly [P in keyof T]: DeepWriteable<T[P]> }

export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K]
}

/* Типы взяты из https://www.npmjs.com/package/camelize-ts */
type CamelCase<S extends string> = S extends `${infer P1}_${infer P2}${infer P3}`
  ? `${P1}${Uppercase<P2>}${CamelCase<P3>}`
  : S

type CamelizeObject<T, S = false> = {
  [K in keyof T as Uncapitalize<CamelCase<string & K>>]: T[K] extends Date
    ? T[K]
    : T[K] extends RegExp
    ? T[K]
    : T[K] extends Array<infer U>
    ? U extends {} | undefined
      ? Array<CamelizeObject<U>>
      : T[K]
    : T[K] extends {} | undefined
    ? S extends true
      ? T[K]
      : CamelizeObject<T[K]>
    : T[K]
}

export type Camelize<T, S = false> = T extends Array<infer U>
  ? Array<CamelizeObject<U, S>>
  : CamelizeObject<T, S>
