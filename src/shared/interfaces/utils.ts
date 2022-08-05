import { FC, PropsWithChildren } from 'react'

export type MaybeNull<T> = T | null
export type MaybeUndefined<T> = T | undefined

export type Keys<T> = keyof T

export type BooleanMap<K extends string> = Record<K, boolean>
export type StringMap<K extends string> = Record<K, string>

export type FCWithChildren<T = {}> = FC<PropsWithChildren<T>>
