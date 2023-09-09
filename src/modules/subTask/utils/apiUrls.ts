import { generatePath } from 'react-router-dom'

import { SubTaskApiEnum } from 'modules/subTask/constants'

import { IdType } from 'shared/types/common'
import { appendSlashAtEnd } from 'shared/utils/string'

export const getSubTaskListUrl = (taskId: IdType): string =>
  appendSlashAtEnd(generatePath(SubTaskApiEnum.GetSubTaskList, { id: String(taskId) }))

export const createSubTaskUrl = (taskId: IdType): string =>
  appendSlashAtEnd(generatePath(SubTaskApiEnum.CreateSubTask, { id: String(taskId) }))

export const cancelSubTaskUrl = (subTaskId: IdType): string =>
  appendSlashAtEnd(generatePath(SubTaskApiEnum.CancelSubTask, { id: String(subTaskId) }))

export const reworkSubTaskUrl = (subTaskId: IdType): string =>
  appendSlashAtEnd(generatePath(SubTaskApiEnum.ReworkSubTask, { id: String(subTaskId) }))
