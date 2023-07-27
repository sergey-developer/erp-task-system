import { Truthy } from 'shared/interfaces/utils'

export const isTruthy = <T>(value: T): value is Truthy<T> => !!value
