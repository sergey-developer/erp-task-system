import { TaskApiEnum } from 'modules/task/constants/task'

import { IdType } from 'shared/types/common'
import { generateApiPath } from 'shared/utils/api'

export const getTaskUrl = (taskId: IdType): string =>
  generateApiPath(TaskApiEnum.GetTask, { id: String(taskId) })

export const takeTaskUrl = (taskId: IdType): string =>
  generateApiPath(TaskApiEnum.TakeTask, { id: String(taskId) })

export const resolveTaskUrl = (taskId: IdType): string =>
  generateApiPath(TaskApiEnum.ResolveTask, { id: String(taskId) })

export const getTaskWorkPerformedActUrl = (taskId: IdType): string =>
  generateApiPath(TaskApiEnum.GetWorkPerformedAct, { id: String(taskId) })

export const getSubTaskListUrl = (taskId: IdType): string =>
  generateApiPath(TaskApiEnum.GetSubTaskList, { id: String(taskId) })

export const createSubTaskUrl = (taskId: IdType): string =>
  generateApiPath(TaskApiEnum.CreateSubTask, { id: String(taskId) })
