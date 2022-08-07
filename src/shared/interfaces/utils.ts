import { FC, PropsWithChildren } from 'react'

export type Nullable<T> = T | null | undefined
export type MaybeNull<T> = T | null
export type MaybeUndefined<T> = T | undefined

export type Keys<T> = keyof T

export type BooleanMap<Key extends string> = Record<Key, boolean>
export type StringMap<Key extends string> = Record<Key, string>

export type FCWithChildren<T = {}> = FC<PropsWithChildren<T>>
