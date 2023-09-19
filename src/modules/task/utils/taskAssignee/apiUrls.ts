import { generatePath } from 'react-router-dom'

import { TaskApiEnum } from 'modules/task/constants/task'

import { IdType } from 'shared/types/common'
import { appendSlashAtEnd } from 'shared/utils/string'

export const updateTaskAssigneeUrl = (taskId: IdType): string =>
  appendSlashAtEnd(generatePath(TaskApiEnum.UpdateTaskAssignee, { id: String(taskId) }))
