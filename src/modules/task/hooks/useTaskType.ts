import { useMemo } from 'react'

import { TaskTypeEnum } from 'modules/task/constants/enums'
import { BooleanMap, Keys } from 'shared/interfaces/utils'

import {
  checkIncidentTaskType,
  checkIncidentType,
  checkRequestTaskType,
  checkRequestType,
} from '../utils/checkTaskType'

type UseTaskTypeReturnType = BooleanMap<`is${Keys<typeof TaskTypeEnum>}`>

const useTaskType = (type: TaskTypeEnum): UseTaskTypeReturnType => {
  return useMemo(
    () => ({
      isIncident: checkIncidentType(type),
      isIncidentTask: checkIncidentTaskType(type),
      isRequest: checkRequestType(type),
      isRequestTask: checkRequestTaskType(type),
    }),
    [type],
  )
}

export default useTaskType
