import { generatePath } from 'react-router-dom'

import { TaskApiEnum } from 'modules/task/constants/task'

import { IdType } from 'shared/types/common'
import { appendSlashAtEnd } from 'shared/utils/string'

export const createTaskSuspendRequestUrl = (taskId: IdType): string =>
  appendSlashAtEnd(
    generatePath(TaskApiEnum.CreateTaskSuspendRequest, {
      id: String(taskId),
    }),
  )

export const deleteTaskSuspendRequestUrl = (taskId: IdType): string =>
  appendSlashAtEnd(
    generatePath(TaskApiEnum.DeleteTaskSuspendRequest, {
      id: String(taskId),
    }),
  )
