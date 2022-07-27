import { useMemo } from 'react'

import { TaskStatusEnum } from 'modules/task/constants/enums'
import { MaybeUndefined } from 'shared/interfaces/utils'

type UseTaskStatusReturnType = Record<
  `is${keyof typeof TaskStatusEnum}`,
  boolean
>

const useTaskStatus = (
  status: MaybeUndefined<TaskStatusEnum>,
): UseTaskStatusReturnType => {
  return useMemo(
    () => ({
      isAppointed: status === TaskStatusEnum.Appointed,
      isAwaiting: status === TaskStatusEnum.Awaiting,
      isClosed: status === TaskStatusEnum.Closed,
      isCompleted: status === TaskStatusEnum.Completed,
      isInProgress: status === TaskStatusEnum.InProgress,
      isInReclassification: status === TaskStatusEnum.InReclassification,
      isNew: status === TaskStatusEnum.New,
      isReclassified: status === TaskStatusEnum.Reclassified,
    }),
    [status],
  )
}

export default useTaskStatus
