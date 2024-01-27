import { IsTruthyType } from 'shared/types/utils'

export const isTruthy = <T>(value: T): value is IsTruthyType<T> => Boolean(value)
