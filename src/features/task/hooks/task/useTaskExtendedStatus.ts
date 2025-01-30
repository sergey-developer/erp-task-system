import isEqual from 'lodash/isEqual'
import { useMemo } from 'react'

import { TaskExtendedStatusEnum } from 'features/task/constants/task'

import { BooleanKey, BooleanMap, Nullable } from 'shared/types/utils'

export const useTaskExtendedStatus = (
  status: Nullable<TaskExtendedStatusEnum>,
): BooleanMap<BooleanKey<keyof typeof TaskExtendedStatusEnum>> => {
  return useMemo(
    () => ({
      isNew: isEqual(status, TaskExtendedStatusEnum.New),
      isAwaiting: isEqual(status, TaskExtendedStatusEnum.Awaiting),
      isClosed: isEqual(status, TaskExtendedStatusEnum.Closed),
      isCompleted: isEqual(status, TaskExtendedStatusEnum.Completed),
      isInProgress: isEqual(status, TaskExtendedStatusEnum.InProgress),
      isReturned: isEqual(status, TaskExtendedStatusEnum.Returned),
      isInReclassification: isEqual(status, TaskExtendedStatusEnum.InReclassification),
      isFirstLineReturned: isEqual(status, TaskExtendedStatusEnum.FirstLineReturned),
    }),
    [status],
  )
}
