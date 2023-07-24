import { FC, ReactNode } from 'react'

export type Nullable<T> = T | null | undefined
export type MaybeNull<T> = T | null
export type MaybeUndefined<T> = T | undefined

export type NonNullableObject<T extends object> = Required<{
  [K in keyof T]: NonNullable<T[K]>
}>

export type FalsyValue = false | '' | 0 | null | undefined
export type Truthy<T> = T extends FalsyValue ? never : T

export type BooleanMap<Key extends string> = Record<Key, boolean>
export type BooleanKey<Key extends string> = `is${Key}`

export type StringMap<Key extends string> = Record<Key, string>

export type FCWithChildren<P = unknown> = FC<P & { children: ReactNode }>

export type AnyFunction = (...args: any) => any
export type FunctionParams<T extends AnyFunction> = ArrayItem<Parameters<T>>

export type NumberOrString = number | string

export type ArrayItem<T extends Array<any>> = T[number]
