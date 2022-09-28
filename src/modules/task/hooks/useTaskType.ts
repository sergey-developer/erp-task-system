import { useMemo } from 'react'

import { TaskTypeEnum } from 'modules/task/constants/common'
import { BooleanMap, Keys } from 'shared/interfaces/utils'
import { isEqual } from 'shared/utils/common/isEqual'

const useTaskType = (
  type: TaskTypeEnum,
): BooleanMap<`is${Keys<typeof TaskTypeEnum>}`> => {
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

export default useTaskType
