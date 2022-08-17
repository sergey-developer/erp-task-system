import { useMemo } from 'react'

import { ReclassificationRequestStatusEnum } from 'modules/task/constants/enums'
import { BooleanMap, Keys, MaybeUndefined } from 'shared/interfaces/utils'

const useReclassificationRequestStatus = (
  status: MaybeUndefined<ReclassificationRequestStatusEnum>,
): BooleanMap<`is${Keys<typeof ReclassificationRequestStatusEnum>}`> => {
  return useMemo(
    () => ({
      isCreated: status === ReclassificationRequestStatusEnum.Created,
      isInProgress: status === ReclassificationRequestStatusEnum.InProgress,
      isApproved: status === ReclassificationRequestStatusEnum.Approved,
      isDenied: status === ReclassificationRequestStatusEnum.Denied,
    }),
    [status],
  )
}

export default useReclassificationRequestStatus
