import debounce from 'lodash/debounce'
import { DependencyList, useCallback } from 'react'

import { DEFAULT_DEBOUNCE_VALUE } from 'shared/constants/common'
import { AnyFunction } from 'shared/types/utils'

export const useDebounceFn = <T extends AnyFunction>(
  fn: T,
  deps: DependencyList = [],
  delay: number = DEFAULT_DEBOUNCE_VALUE,
  // eslint-disable-next-line react-hooks/exhaustive-deps
) => useCallback(debounce(fn, delay), [fn, delay, ...deps]) as unknown as T
