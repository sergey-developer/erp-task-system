import { Truthy } from 'shared/types/utils'

import { isTruthy } from './isTruthy'

export const valueOrHyphen = <T>(value: T): Truthy<T> | '-' => (isTruthy(value) ? value : '-')
