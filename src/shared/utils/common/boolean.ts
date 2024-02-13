import { IsTruthyType } from 'shared/types/utils'

export const isTrue = (value: any): boolean => value === true
export const isTruthy = <T>(value: T): value is IsTruthyType<T> => Boolean(value)

export const isFalse = (value: any): boolean => value === false
