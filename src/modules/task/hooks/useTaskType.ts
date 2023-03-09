import { useMemo } from 'react'

import { TaskTypeEnum } from 'modules/task/constants/common'

import { BooleanMap, MaybeUndefined } from 'shared/interfaces/utils'
import { isEqual } from 'shared/utils/common/isEqual'

export const useTaskType = (
  type: MaybeUndefined<TaskTypeEnum>,
): BooleanMap<`is${keyof typeof TaskTypeEnum}`> => {
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
