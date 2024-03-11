import { HYPHEN } from 'shared/constants/common'
import { IsTruthyType } from 'shared/types/utils'

import { isTruthy } from './boolean'

export const valueOrHyphen = <T>(value: T): IsTruthyType<T> | typeof HYPHEN =>
  isTruthy(value) ? value : HYPHEN
