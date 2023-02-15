import { useMemo } from 'react'

import { SuspendRequestStatusEnum } from 'modules/task/constants/common'
import { BooleanMap, MaybeUndefined } from 'shared/interfaces/utils'
import { isEqual } from 'shared/utils/common/isEqual'

export type UseTaskSuspendRequestStatusResult =
  BooleanMap<`is${keyof typeof SuspendRequestStatusEnum}`>

export const useTaskSuspendRequestStatus = (
  status: MaybeUndefined<SuspendRequestStatusEnum>,
): UseTaskSuspendRequestStatusResult => {
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
