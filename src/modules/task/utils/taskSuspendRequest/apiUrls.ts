import { TaskApiEnum } from 'modules/task/constants/task'

import { IdType } from 'shared/types/common'
import { generateApiPath } from 'shared/utils/api'

export const createTaskSuspendRequestUrl = (taskId: IdType): string =>
  generateApiPath(TaskApiEnum.CreateTaskSuspendRequest, { id: String(taskId) })

export const deleteTaskSuspendRequestUrl = (taskId: IdType): string =>
  generateApiPath(TaskApiEnum.DeleteTaskSuspendRequest, { id: String(taskId) })
