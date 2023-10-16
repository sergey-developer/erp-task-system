import { generatePath } from 'react-router-dom'

import { TaskApiEnum } from 'modules/task/constants/task'

import { IdType } from 'shared/types/common'
import { appendSlashAtEnd } from 'shared/utils/string'

export const createTaskReclassificationRequestUrl = (taskId: IdType): string =>
  appendSlashAtEnd(
    generatePath(TaskApiEnum.CreateReclassificationRequest, {
      id: String(taskId),
    }),
  )

export const getTaskReclassificationRequestUrl = (taskId: IdType): string =>
  appendSlashAtEnd(
    generatePath(TaskApiEnum.GetReclassificationRequest, {
      id: String(taskId),
    }),
  )
