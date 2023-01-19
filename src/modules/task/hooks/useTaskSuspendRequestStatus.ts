import { useMemo } from 'react'

import { SuspendRequestStatusEnum } from 'modules/task/constants/common'
import { BooleanMap, MaybeUndefined } from 'shared/interfaces/utils'
import { isEqual } from 'shared/utils/common/isEqual'

export const useTaskSuspendRequestStatus = (
  status: MaybeUndefined<SuspendRequestStatusEnum>,
): BooleanMap<`is${keyof typeof SuspendRequestStatusEnum}`> => {
  return useMemo(
    () => ({
      isNew: isEqual(status, SuspendRequestStatusEnum.New),
      isInProgress: isEqual(status, SuspendRequestStatusEnum.InProgress),
      isApproved: isEqual(status, SuspendRequestStatusEnum.Approved),
      isCanceled: isEqual(status, SuspendRequestStatusEnum.Canceled),
      isDenied: isEqual(status, SuspendRequestStatusEnum.Denied),
    }),
    [status],
  )
}
