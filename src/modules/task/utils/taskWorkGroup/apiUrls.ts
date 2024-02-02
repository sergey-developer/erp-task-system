import { TaskApiEnum } from 'modules/task/constants/task'

import { IdType } from 'shared/types/common'
import { generateApiPath } from 'shared/utils/api'

export const updateTaskWorkGroupUrl = (taskId: IdType): string =>
  generateApiPath(TaskApiEnum.UpdateTaskWorkGroup, { id: String(taskId) })

export const deleteTaskWorkGroupUrl = (taskId: IdType): string =>
  generateApiPath(TaskApiEnum.DeleteTaskWorkGroup, { id: String(taskId) })
