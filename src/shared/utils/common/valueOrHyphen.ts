import { IsTruthyType } from 'shared/types/utils'

import { isTruthy } from './isTruthy'

export const valueOrHyphen = <T>(value: T): IsTruthyType<T> | '-' => (isTruthy(value) ? value : '-')
