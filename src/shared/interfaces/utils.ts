import { FC, PropsWithChildren } from 'react'

export type Nullable<T> = T | null | undefined
export type MaybeNull<T> = T | null
export type MaybeUndefined<T> = T | undefined

export type NonNullableObject<T extends object> = Required<{
  [K in keyof T]: NonNullable<T[K]>
}>

export type BooleanMap<Key extends string> = Record<Key, boolean>
export type StringMap<Key extends string> = Record<Key, string>

export type FCWithChildren<T = {}> = FC<PropsWithChildren<T>>

export type AnyFunction = (...args: any) => any
export type FunctionParams<T extends AnyFunction> = ArrayItem<Parameters<T>>

export type NumberOrString = number | string

export type ArrayItem<T extends Array<any>> = T[number]
