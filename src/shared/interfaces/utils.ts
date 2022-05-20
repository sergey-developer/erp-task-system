import { FC, PropsWithChildren } from 'react'

export type MaybeNull<T> = T | null
export type MaybeUndefined<T> = T | undefined

export type FCWithChildren<T = {}> = FC<PropsWithChildren<T>>
