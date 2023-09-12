import { generatePath } from 'react-router-dom'

import { TaskApiEnum } from 'modules/task/services/taskApiService'

import { IdType } from 'shared/types/common'
import { appendSlashAtEnd } from 'shared/utils/string'

export const getTaskUrl = (taskId: IdType): string =>
  appendSlashAtEnd(generatePath(TaskApiEnum.GetTask, { id: String(taskId) }))

export const takeTaskUrl = (taskId: IdType): string =>
  appendSlashAtEnd(generatePath(TaskApiEnum.TakeTask, { id: String(taskId) }))

export const resolveTaskUrl = (taskId: IdType): string =>
  appendSlashAtEnd(generatePath(TaskApiEnum.ResolveTask, { id: String(taskId) }))

export const getTaskWorkPerformedActUrl = (taskId: IdType): string =>
  appendSlashAtEnd(generatePath(TaskApiEnum.GetWorkPerformedAct, { id: String(taskId) }))
