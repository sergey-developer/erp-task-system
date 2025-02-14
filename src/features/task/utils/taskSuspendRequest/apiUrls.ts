import { TaskApiEnum } from 'features/task/constants/task'

import { IdType } from 'shared/types/common'
import { generateApiPath } from 'shared/utils/api'

export const createTaskSuspendRequestApiPath = (taskId: IdType): string =>
  generateApiPath(TaskApiEnum.CreateTaskSuspendRequest, { id: String(taskId) })

export const deleteTaskSuspendRequestApiPath = (taskId: IdType): string =>
  generateApiPath(TaskApiEnum.DeleteTaskSuspendRequest, { id: String(taskId) })
