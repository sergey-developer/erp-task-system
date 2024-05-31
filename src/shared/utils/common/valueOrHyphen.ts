import { HYPHEN } from 'shared/constants/common'
import { IsTruthyType } from 'shared/types/utils'

import { isTruthy } from './boolean'

type ResultType<V, F> = F extends (value: IsTruthyType<V>) => infer R ? R : IsTruthyType<V>

export const valueOrHyphen = <V, F extends (value: IsTruthyType<V>) => any>(
  value: V,
  getValue?: F,
): ResultType<V, F> =>
  isTruthy(value)
    ? Array.isArray(value)
      ? !!value.length
        ? getValue
          ? getValue(value)
          : value
        : HYPHEN
      : getValue
      ? getValue(value)
      : value
    : HYPHEN
