import { IsTruthyType } from 'shared/types/utils'

import { isTruthy } from './boolean'

export const valueOrHyphen = <T>(value: T): IsTruthyType<T> | '-' => (isTruthy(value) ? value : '-')
