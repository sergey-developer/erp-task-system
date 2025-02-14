import { relocationTaskStatusDict } from 'features/relocationTasks/constants'
import { RelocationTaskDetailDTO } from 'features/warehouse/models'

import { formatDate } from 'shared/utils/date'

export const getRelocationTaskReportTableColValue = (
  relocationTask: Pick<RelocationTaskDetailDTO, 'id' | 'createdAt' | 'status'>,
) =>
  `№${relocationTask.id} от ${formatDate(relocationTask.createdAt)} (${
    relocationTaskStatusDict[relocationTask.status]
  })`
