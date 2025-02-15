import { relocationTaskStatusDict } from 'features/relocationTasks/constants'
import { RelocationTaskDetailDTO } from 'features/warehouses/api/dto'

import { formatDate } from 'shared/utils/date'

export const getRelocationTaskReportTableColValue = (
  relocationTask: Pick<RelocationTaskDetailDTO, 'id' | 'createdAt' | 'status'>,
) =>
  `№${relocationTask.id} от ${formatDate(relocationTask.createdAt)} (${
    relocationTaskStatusDict[relocationTask.status]
  })`
