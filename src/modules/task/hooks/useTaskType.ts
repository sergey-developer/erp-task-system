import { useMemo } from 'react'

import { TaskTypeEnum } from 'modules/task/constants'

import { BooleanKey, BooleanMap, MaybeUndefined } from 'shared/interfaces/utils'
import { isEqual } from 'shared/utils/common/isEqual'

export const useTaskType = (
  type: MaybeUndefined<TaskTypeEnum>,
): BooleanMap<BooleanKey<keyof typeof TaskTypeEnum>> => {
  return useMemo(
    () => ({
      isIncident: isEqual(type, TaskTypeEnum.Incident),
      isIncidentTask: isEqual(type, TaskTypeEnum.IncidentTask),
      isRequest: isEqual(type, TaskTypeEnum.Request),
      isRequestTask: isEqual(type, TaskTypeEnum.RequestTask),
    }),
    [type],
  )
}
