import isEqual from 'lodash/isEqual'
import { useMemo } from 'react'

import { TaskTypeEnum } from 'modules/task/constants'

import { BooleanKey, BooleanMap, MaybeUndefined } from 'shared/types/utils'

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
