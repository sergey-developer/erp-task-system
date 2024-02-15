import { relocationTaskStatusDict } from 'modules/warehouse/constants/relocationTask'
import { RelocationTaskModel } from 'modules/warehouse/models'

import { formatDate } from 'shared/utils/date'

export const getRelocationColValue = (
  relocationTask: Pick<RelocationTaskModel, 'id' | 'createdAt' | 'status'>,
) =>
  `№${relocationTask.id} от ${formatDate(relocationTask.createdAt)} (${
    relocationTaskStatusDict[relocationTask.status]
  })`
