import { FC, ReactNode } from 'react'

export type Nullable<T> = T | null | undefined
export type MaybeNull<T> = T | null
export type MaybeUndefined<T> = T | undefined

export type NonNullableObject<T extends object> = Required<{
  [K in keyof T]: NonNullable<T[K]>
}>

export type Truthy<T> = T extends false | '' | 0 | null | undefined ? never : T

export type BooleanMap<Key extends string> = Record<Key, boolean>
export type BooleanKey<Key extends string> = `is${Key}`

export type StringMap<Key extends string> = Record<Key, string>

export type FCWithChildren<P = unknown> = FC<P & { children: ReactNode }>

export type AnyFunction = (...args: any) => any
export type FunctionParams<T extends AnyFunction> = ArrayFirst<Parameters<T>>

export type NumberOrString = number | string

export type ArrayFirst<T extends any[]> = T['length'] extends 0 ? never : T[0]
