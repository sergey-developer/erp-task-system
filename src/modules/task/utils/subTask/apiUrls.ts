import { generatePath } from 'react-router-dom'

import { SubTaskApiEnum } from 'modules/task/constants/subTask'

import { IdType } from 'shared/types/common'
import { appendSlashAtEnd } from 'shared/utils/string'

export const cancelSubTaskUrl = (subTaskId: IdType): string =>
  appendSlashAtEnd(generatePath(SubTaskApiEnum.CancelSubTask, { id: String(subTaskId) }))

export const reworkSubTaskUrl = (subTaskId: IdType): string =>
  appendSlashAtEnd(generatePath(SubTaskApiEnum.ReworkSubTask, { id: String(subTaskId) }))
