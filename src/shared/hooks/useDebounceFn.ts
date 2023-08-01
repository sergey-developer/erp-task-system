import debounce from 'lodash/debounce'
import { DependencyList, useCallback } from 'react'

import { DOUBLE_CLICK_DEBOUNCE_TIME } from 'shared/constants/common'
import { AnyFunction } from 'shared/interfaces/utils'

export const useDebounceFn = <T extends AnyFunction>(
  fn: T,
  deps: DependencyList = [],
  delay: number = DOUBLE_CLICK_DEBOUNCE_TIME,
  // eslint-disable-next-line react-hooks/exhaustive-deps
) => useCallback(debounce(fn, delay), [fn, delay, ...deps]) as unknown as T
