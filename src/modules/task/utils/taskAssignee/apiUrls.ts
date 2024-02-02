import { TaskApiEnum } from 'modules/task/constants/task'

import { IdType } from 'shared/types/common'
import { generateApiPath } from 'shared/utils/api'

export const updateTaskAssigneeUrl = (taskId: IdType): string =>
  generateApiPath(TaskApiEnum.UpdateTaskAssignee, { id: String(taskId) })
