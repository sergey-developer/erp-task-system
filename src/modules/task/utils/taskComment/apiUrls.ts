import { generatePath } from 'react-router-dom'

import { TaskApiEnum } from 'modules/task/services/taskApiService'

import { IdType } from 'shared/types/common'
import { appendSlashAtEnd } from 'shared/utils/string'

export const createTaskCommentUrl = (taskId: IdType): string =>
  appendSlashAtEnd(generatePath(TaskApiEnum.CreateTaskComment, { id: String(taskId) }))

export const getTaskCommentListUrl = (taskId: IdType): string =>
  appendSlashAtEnd(generatePath(TaskApiEnum.GetTaskCommentList, { id: String(taskId) }))
