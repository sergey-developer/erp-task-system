import { TaskApiEnum } from 'features/task/constants/task'

import { IdType } from 'shared/types/common'
import { generateApiPath } from 'shared/utils/api'

export const createTaskCommentUrl = (taskId: IdType): string =>
  generateApiPath(TaskApiEnum.CreateTaskComment, { id: String(taskId) })

export const getTaskCommentListUrl = (taskId: IdType): string =>
  generateApiPath(TaskApiEnum.GetTaskCommentList, { id: String(taskId) })
