import { generatePath } from 'react-router-dom'

import { SubTaskEndpointsEnum } from '../constants/api'

export const getSubTaskListUrl = (taskId: number): string =>
  generatePath(SubTaskEndpointsEnum.GetSubTaskList, { id: String(taskId) })

export const getSubTaskTemplateListUrl = (): string =>
  SubTaskEndpointsEnum.GetSubTaskTemplateList

export const getCreateSubTaskUrl = (taskId: number): string =>
  generatePath(SubTaskEndpointsEnum.CreateSubTask, { id: String(taskId) })

export const cancelSubTaskUrl = (subTaskId: number): string =>
  generatePath(SubTaskEndpointsEnum.CancelSubTask, { id: String(subTaskId) })

export const reworkSubTaskUrl = (subTaskId: number): string =>
  generatePath(SubTaskEndpointsEnum.ReworkSubTask, { id: String(subTaskId) })
