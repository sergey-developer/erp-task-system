import { Truthy } from 'shared/interfaces/utils'

export const truthy = <T>(value: T): value is Truthy<T> => !!value
