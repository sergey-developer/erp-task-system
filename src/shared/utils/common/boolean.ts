import { Truthy } from 'shared/types/utils'

export const isTrue = (value: any): boolean => value === true
export const isTruthy = <T>(value: T): value is Truthy<T> => Boolean(value)

export const isFalse = (value: any): boolean => value === false
