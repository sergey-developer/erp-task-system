import { generatePath } from 'react-router-dom'

import { SubTaskEndpointEnum } from '../constants/api'

export const getSubTaskListUrl = (taskId: number): string =>
  generatePath(SubTaskEndpointEnum.GetSubTaskList, { id: String(taskId) })

export const getSubTaskTemplateListUrl = (): string =>
  SubTaskEndpointEnum.GetSubTaskTemplateList

export const getCreateSubTaskUrl = (taskId: number): string =>
  generatePath(SubTaskEndpointEnum.CreateSubTask, { id: String(taskId) })

export const getCancelSubTaskUrl = (subTaskId: number): string =>
  generatePath(SubTaskEndpointEnum.CancelSubTask, { id: String(subTaskId) })

export const getReworkSubTaskUrl = (subTaskId: number): string =>
  generatePath(SubTaskEndpointEnum.ReworkSubTask, { id: String(subTaskId) })
