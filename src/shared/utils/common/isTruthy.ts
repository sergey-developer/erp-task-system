import { Truthy } from 'shared/types/utils'

export const isTruthy = <T>(value: T): value is Truthy<T> => !!value
