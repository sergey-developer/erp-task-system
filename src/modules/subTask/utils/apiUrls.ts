import { generatePath } from 'react-router-dom'

import { SubTaskEndpointEnum } from 'modules/subTask/constants/api'

export const getSubTaskListUrl = (taskId: number): string =>
  generatePath(SubTaskEndpointEnum.GetSubTaskList, { id: String(taskId) })

export const getSubTaskTemplateListUrl = (): string =>
  SubTaskEndpointEnum.GetSubTaskTemplateList

export const createSubTaskUrl = (taskId: number): string =>
  generatePath(SubTaskEndpointEnum.CreateSubTask, { id: String(taskId) })

export const cancelSubTaskUrl = (subTaskId: number): string =>
  generatePath(SubTaskEndpointEnum.CancelSubTask, { id: String(subTaskId) })

export const reworkSubTaskUrl = (subTaskId: number): string =>
  generatePath(SubTaskEndpointEnum.ReworkSubTask, { id: String(subTaskId) })
