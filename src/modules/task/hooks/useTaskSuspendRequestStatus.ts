import isEqual from 'lodash/isEqual'
import { useMemo } from 'react'

import { SuspendRequestStatusEnum } from 'modules/task/constants'

import { BooleanKey, BooleanMap, MaybeUndefined } from 'shared/interfaces/utils'

export type UseTaskSuspendRequestStatusResult = BooleanMap<
  BooleanKey<keyof typeof SuspendRequestStatusEnum>
>

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
