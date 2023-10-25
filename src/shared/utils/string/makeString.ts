import { Nullable } from 'shared/types/utils'

import { isTruthy } from '../common'

export const makeString = (separator: string, ...args: Nullable<string>[]): string =>
  args
    .filter(isTruthy)
    .map((str) => str.trim())
    .join(separator)
