import debounce from 'lodash/debounce'
import { DependencyList, useCallback } from 'react'

import { DOUBLE_CLICK_DEBOUNCE_TIME } from 'shared/constants/common'
import { AnyFn } from 'shared/interfaces/utils'

const useDebounceFn = <T extends AnyFn>(
  fn: T,
  deps: DependencyList = [],
  delay: number = DOUBLE_CLICK_DEBOUNCE_TIME,
  // eslint-disable-next-line react-hooks/exhaustive-deps
) => useCallback(debounce(fn, delay), [fn, delay, ...deps])

export default useDebounceFn
