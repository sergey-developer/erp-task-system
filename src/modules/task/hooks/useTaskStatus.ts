import { useMemo } from 'react'

import { TaskStatusEnum } from 'modules/task/constants/enums'
import { Keys, MaybeUndefined } from 'shared/interfaces/utils'

type UseTaskStatusReturnType = Record<
  `is${Keys<typeof TaskStatusEnum>}`,
  boolean
>

const useTaskStatus = (
  status: MaybeUndefined<TaskStatusEnum>,
): UseTaskStatusReturnType => {
  return useMemo(
    () => ({
      isNew: status === TaskStatusEnum.New,
      isAppointed: status === TaskStatusEnum.Appointed,
      isInProgress: status === TaskStatusEnum.InProgress,
      isCompleted: status === TaskStatusEnum.Completed,
      isAwaiting: status === TaskStatusEnum.Awaiting,
      isInReclassification: status === TaskStatusEnum.InReclassification,
      isReturned: status === TaskStatusEnum.Returned,
      isClosed: status === TaskStatusEnum.Closed,
    }),
    [status],
  )
}

export default useTaskStatus
