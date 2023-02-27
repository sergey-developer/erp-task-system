import { useMemo } from 'react'

import { TaskStatusEnum } from 'modules/task/constants/common'

import { BooleanMap, MaybeUndefined } from 'shared/interfaces/utils'
import { isEqual } from 'shared/utils/common/isEqual'

export const useTaskStatus = (
  status: MaybeUndefined<TaskStatusEnum>,
): BooleanMap<`is${keyof typeof TaskStatusEnum}`> => {
  return useMemo(
    () => ({
      isNew: isEqual(status, TaskStatusEnum.New),
      isInProgress: isEqual(status, TaskStatusEnum.InProgress),
      isAwaiting: isEqual(status, TaskStatusEnum.Awaiting),
      isCompleted: isEqual(status, TaskStatusEnum.Completed),
      isClosed: isEqual(status, TaskStatusEnum.Closed),
    }),
    [status],
  )
}
