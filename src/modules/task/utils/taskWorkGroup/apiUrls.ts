import { generatePath } from 'react-router-dom'

import { TaskApiEnum } from 'modules/task/constants/task'

import { IdType } from 'shared/types/common'
import { appendSlashAtEnd } from 'shared/utils/string'

export const updateTaskWorkGroupUrl = (taskId: IdType): string =>
  appendSlashAtEnd(generatePath(TaskApiEnum.UpdateTaskWorkGroup, { id: String(taskId) }))

export const deleteTaskWorkGroupUrl = (taskId: IdType): string =>
  appendSlashAtEnd(generatePath(TaskApiEnum.DeleteTaskWorkGroup, { id: String(taskId) }))
