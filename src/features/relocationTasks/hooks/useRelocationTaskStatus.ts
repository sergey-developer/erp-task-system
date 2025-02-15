import isEqual from 'lodash/isEqual'
import { useMemo } from 'react'

import { BooleanKey, BooleanMap, MaybeUndefined } from 'shared/types/utils'

import { RelocationTaskStatusEnum } from '../api/constants'

export const useRelocationTaskStatus = (
  status: MaybeUndefined<RelocationTaskStatusEnum>,
): BooleanMap<BooleanKey<keyof typeof RelocationTaskStatusEnum>> => {
  return useMemo(
    () => ({
      isDraft: isEqual(status, RelocationTaskStatusEnum.Draft),
      isNew: isEqual(status, RelocationTaskStatusEnum.New),
      isCompleted: isEqual(status, RelocationTaskStatusEnum.Completed),
      isClosed: isEqual(status, RelocationTaskStatusEnum.Closed),
      isCanceled: isEqual(status, RelocationTaskStatusEnum.Canceled),
      isReturned: isEqual(status, RelocationTaskStatusEnum.Returned),
    }),
    [status],
  )
}
