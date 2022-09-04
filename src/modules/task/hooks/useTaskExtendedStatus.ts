import { useMemo } from 'react'

import { TaskExtendedStatusEnum } from 'modules/task/constants/enums'
import { BooleanMap, Keys } from 'shared/interfaces/utils'
import { isEqual } from 'shared/utils/common/isEqual'

const useTaskExtendedStatus = (
  status: TaskExtendedStatusEnum,
): BooleanMap<`is${Keys<typeof TaskExtendedStatusEnum>}`> => {
  return useMemo(
    () => ({
      isNew: isEqual(status, TaskExtendedStatusEnum.New),
      isAppointed: isEqual(status, TaskExtendedStatusEnum.Appointed),
      isAwaiting: isEqual(status, TaskExtendedStatusEnum.Awaiting),
      isClosed: isEqual(status, TaskExtendedStatusEnum.Closed),
      isCompleted: isEqual(status, TaskExtendedStatusEnum.Completed),
      isInProgress: isEqual(status, TaskExtendedStatusEnum.InProgress),
      isReturned: isEqual(status, TaskExtendedStatusEnum.Returned),
      isInReclassification: isEqual(
        status,
        TaskExtendedStatusEnum.InReclassification,
      ),
    }),
    [status],
  )
}

export default useTaskExtendedStatus
