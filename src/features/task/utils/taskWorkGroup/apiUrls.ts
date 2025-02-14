import { TaskApiEnum } from 'features/task/constants/task'

import { IdType } from 'shared/types/common'
import { generateApiPath } from 'shared/utils/api'

export const updateTaskWorkGroupApiPath = (taskId: IdType): string =>
  generateApiPath(TaskApiEnum.UpdateTaskWorkGroup, { id: String(taskId) })

export const deleteTaskWorkGroupApiPath = (taskId: IdType): string =>
  generateApiPath(TaskApiEnum.DeleteTaskWorkGroup, { id: String(taskId) })
