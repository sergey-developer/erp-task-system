import { IsTruthyType } from 'shared/types/utils'

export const isTrue = (value: any): value is true => value === true
export const isTruthy = <T>(value: T): value is IsTruthyType<T> => Boolean(value)

export const isFalse = (value: any): value is false => value === false
