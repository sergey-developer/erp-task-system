import { useMemo } from 'react'

import { TaskTypeEnum } from 'modules/task/constants/enums'
import { BooleanMap, Keys } from 'shared/interfaces/utils'

const useTaskType = (
  type: TaskTypeEnum,
): BooleanMap<`is${Keys<typeof TaskTypeEnum>}`> => {
  return useMemo(
    () => ({
      isIncident: type === TaskTypeEnum.Incident,
      isIncidentTask: type === TaskTypeEnum.IncidentTask,
      isRequest: type === TaskTypeEnum.Request,
      isRequestTask: type === TaskTypeEnum.RequestTask,
    }),
    [type],
  )
}

export default useTaskType
