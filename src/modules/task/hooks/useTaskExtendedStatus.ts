import { useMemo } from 'react'

import { TaskExtendedStatusEnum } from 'modules/task/constants/common'

import { BooleanMap, MaybeUndefined } from 'shared/interfaces/utils'
import { isEqual } from 'shared/utils/common/isEqual'

export const useTaskExtendedStatus = (
  status: MaybeUndefined<TaskExtendedStatusEnum>,
): BooleanMap<`is${keyof typeof TaskExtendedStatusEnum}`> => {
  return useMemo(
    () => ({
      isNew: isEqual(status, TaskExtendedStatusEnum.New),
      isAwaiting: isEqual(status, TaskExtendedStatusEnum.Awaiting),
      isClosed: isEqual(status, TaskExtendedStatusEnum.Closed),
      isCompleted: isEqual(status, TaskExtendedStatusEnum.Completed),
      isInProgress: isEqual(status, TaskExtendedStatusEnum.InProgress),
      isReturned: isEqual(status, TaskExtendedStatusEnum.Returned),
      isInReclassification: isEqual(
        status,
        TaskExtendedStatusEnum.InReclassification,
      ),
      isFirstLineReturned: isEqual(
        status,
        TaskExtendedStatusEnum.FirstLineReturned,
      ),
    }),
    [status],
  )
}
