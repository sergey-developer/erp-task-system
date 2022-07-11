import { TaskTypeEnum } from '../constants'

const checkTaskType =
  (typeToCheck: TaskTypeEnum) =>
  (type: TaskTypeEnum): boolean =>
    typeToCheck === type

export const checkIncidentType = checkTaskType(TaskTypeEnum.Incident)
export const checkIncidentTaskType = checkTaskType(TaskTypeEnum.IncidentTask)
export const checkRequestType = checkTaskType(TaskTypeEnum.Request)
export const checkRequestTaskType = checkTaskType(TaskTypeEnum.RequestTask)
