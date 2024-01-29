import { Truthy } from 'shared/types/utils'

import { isTruthy } from './boolean'

export const valueOrHyphen = <T>(value: T): Truthy<T> | '-' => (isTruthy(value) ? value : '-')
