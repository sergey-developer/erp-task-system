import { useMemo } from 'react'

import { TaskStatusEnum } from 'modules/task/constants/common'
import { BooleanMap, MaybeUndefined } from 'shared/interfaces/utils'
import { isEqual } from 'shared/utils/common/isEqual'

const useTaskStatus = (
  status: MaybeUndefined<TaskStatusEnum>,
): BooleanMap<`is${keyof typeof TaskStatusEnum}`> => {
  return useMemo(
    () => ({
      isNew: isEqual(status, TaskStatusEnum.New),
      isAppointed: isEqual(status, TaskStatusEnum.Appointed),
      isInProgress: isEqual(status, TaskStatusEnum.InProgress),
      isCompleted: isEqual(status, TaskStatusEnum.Completed),
      isAwaiting: isEqual(status, TaskStatusEnum.Awaiting),
      isInReclassification: isEqual(status, TaskStatusEnum.InReclassification),
      isReturned: isEqual(status, TaskStatusEnum.Returned),
      isClosed: isEqual(status, TaskStatusEnum.Closed),
    }),
    [status],
  )
}

export default useTaskStatus
