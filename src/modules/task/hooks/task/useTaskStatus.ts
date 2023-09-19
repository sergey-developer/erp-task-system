import isEqual from 'lodash/isEqual'
import { useMemo } from 'react'

import { TaskStatusEnum } from 'modules/task/constants/task'

import { BooleanKey, BooleanMap, MaybeUndefined } from 'shared/types/utils'

export const useTaskStatus = (
  status: MaybeUndefined<TaskStatusEnum>,
): BooleanMap<BooleanKey<keyof typeof TaskStatusEnum>> => {
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
