import isEqual from 'lodash/isEqual'
import { useMemo } from 'react'

import { RelocationTaskStatusEnum } from 'modules/warehouse/constants/relocationTask'

import { BooleanKey, BooleanMap, MaybeUndefined } from 'shared/types/utils'

export const useRelocationTaskStatus = (
  status: MaybeUndefined<RelocationTaskStatusEnum>,
): BooleanMap<BooleanKey<keyof typeof RelocationTaskStatusEnum>> => {
  return useMemo(
    () => ({
      isNew: isEqual(status, RelocationTaskStatusEnum.New),
      isCompleted: isEqual(status, RelocationTaskStatusEnum.Completed),
      isClosed: isEqual(status, RelocationTaskStatusEnum.Closed),
      isCanceled: isEqual(status, RelocationTaskStatusEnum.Canceled),
      isReturned: isEqual(status, RelocationTaskStatusEnum.Returned),
      isDraft: isEqual(status, RelocationTaskStatusEnum.Draft),
    }),
    [status],
  )
}
