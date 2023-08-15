import { generatePath } from 'react-router-dom'

import { SubTaskApiEnum } from 'modules/subTask/constants'

import { appendSlashAtEnd } from 'shared/utils/string'

export const getSubTaskListUrl = (taskId: number): string =>
  appendSlashAtEnd(
    generatePath(SubTaskApiEnum.GetSubTaskList, { id: String(taskId) }),
  )

export const createSubTaskUrl = (taskId: number): string =>
  appendSlashAtEnd(
    generatePath(SubTaskApiEnum.CreateSubTask, { id: String(taskId) }),
  )

export const cancelSubTaskUrl = (subTaskId: number): string =>
  appendSlashAtEnd(
    generatePath(SubTaskApiEnum.CancelSubTask, { id: String(subTaskId) }),
  )

export const reworkSubTaskUrl = (subTaskId: number): string =>
  appendSlashAtEnd(
    generatePath(SubTaskApiEnum.ReworkSubTask, { id: String(subTaskId) }),
  )
