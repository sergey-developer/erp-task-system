import { RelocationTaskDetailDTO } from 'features/relocationTasks/api/dto'
import { relocationTaskStatusDict } from 'features/relocationTasks/constants'

import { formatDate } from 'shared/utils/date'

export const getRelocationTaskReportTableColValue = (
  relocationTask: Pick<RelocationTaskDetailDTO, 'id' | 'createdAt' | 'status'>,
) =>
  `№${relocationTask.id} от ${formatDate(relocationTask.createdAt)} (${
    relocationTaskStatusDict[relocationTask.status]
  })`
