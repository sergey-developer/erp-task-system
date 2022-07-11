import { useMemo } from 'react'

import { TaskTypeEnum } from '../constants'
import {
  checkIncidentTaskType,
  checkIncidentType,
  checkRequestTaskType,
  checkRequestType,
} from '../utils/checkTaskType'

type UseTaskTypeReturnType = Record<`is${keyof typeof TaskTypeEnum}`, boolean>

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
