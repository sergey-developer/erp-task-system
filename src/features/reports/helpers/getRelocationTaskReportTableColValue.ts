import { relocationTaskStatusDict } from 'features/warehouse/constants/relocationTask'
import { RelocationTaskModel } from 'features/warehouse/models'

import { formatDate } from 'shared/utils/date'

export const getRelocationTaskReportTableColValue = (
  relocationTask: Pick<RelocationTaskModel, 'id' | 'createdAt' | 'status'>,
) =>
  `№${relocationTask.id} от ${formatDate(relocationTask.createdAt)} (${
    relocationTaskStatusDict[relocationTask.status]
  })`
