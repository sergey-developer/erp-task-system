import { TaskApiEnum } from 'features/task/constants/task'

import { IdType } from 'shared/types/common'
import { generateApiPath } from 'shared/utils/api'

export const updateTaskAssigneeApiPath = (taskId: IdType): string =>
  generateApiPath(TaskApiEnum.UpdateTaskAssignee, { id: String(taskId) })
