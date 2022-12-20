import { generatePath } from 'react-router-dom'

import { SubTaskEndpointsEnum } from '../constants/api'

export const getSubTaskListUrl = (taskId: number): string =>
  generatePath(SubTaskEndpointsEnum.GetSubTaskList, { id: String(taskId) })

export const getSubTaskTemplateListUrl = (): string =>
  SubTaskEndpointsEnum.GetSubTaskTemplateList

export const getCreateSubTaskUrl = (taskId: number): string =>
  generatePath(SubTaskEndpointsEnum.CreateSubTask, { id: String(taskId) })

export const cancelSubTaskUrl = (taskId: number): string =>
  generatePath(SubTaskEndpointsEnum.CancelSubTask, { id: String(taskId) })

export const reworkSubTaskUrl = (taskId: number): string =>
  generatePath(SubTaskEndpointsEnum.ReworkSubTask, { id: String(taskId) })
