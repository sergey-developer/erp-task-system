import { SubTaskApiEnum } from 'features/task/constants/subTask'

import { IdType } from 'shared/types/common'
import { generateApiPath } from 'shared/utils/api'

export const cancelSubTaskApiPath = (subTaskId: IdType): string =>
  generateApiPath(SubTaskApiEnum.CancelSubTask, { id: String(subTaskId) })

export const reworkSubTaskApiPath = (subTaskId: IdType): string =>
  generateApiPath(SubTaskApiEnum.ReworkSubTask, { id: String(subTaskId) })
