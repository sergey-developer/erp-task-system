import { generatePath } from 'react-router-dom'

import { SubTaskEndpointEnum } from 'modules/subTask/constants/api'

import { appendSlashAtEnd } from 'shared/utils/string'

export const getSubTaskListUrl = (taskId: number): string =>
  appendSlashAtEnd(
    generatePath(SubTaskEndpointEnum.GetSubTaskList, { id: String(taskId) }),
  )

export const getSubTaskTemplateListUrl = (): string =>
  appendSlashAtEnd(SubTaskEndpointEnum.GetSubTaskTemplateList)

export const createSubTaskUrl = (taskId: number): string =>
  appendSlashAtEnd(
    generatePath(SubTaskEndpointEnum.CreateSubTask, { id: String(taskId) }),
  )

export const cancelSubTaskUrl = (subTaskId: number): string =>
  appendSlashAtEnd(
    generatePath(SubTaskEndpointEnum.CancelSubTask, { id: String(subTaskId) }),
  )

export const reworkSubTaskUrl = (subTaskId: number): string =>
  appendSlashAtEnd(
    generatePath(SubTaskEndpointEnum.ReworkSubTask, { id: String(subTaskId) }),
  )
