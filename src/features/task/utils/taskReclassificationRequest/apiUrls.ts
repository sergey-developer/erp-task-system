import { TaskApiEnum } from 'features/task/constants/task'

import { IdType } from 'shared/types/common'
import { generateApiPath } from 'shared/utils/api'

export const createTaskReclassificationRequestApiPath = (taskId: IdType): string =>
  generateApiPath(TaskApiEnum.CreateReclassificationRequest, { id: String(taskId) })

export const getTaskReclassificationRequestApiPath = (taskId: IdType): string =>
  generateApiPath(TaskApiEnum.GetReclassificationRequest, { id: String(taskId) })
