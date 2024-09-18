import { useMemo } from 'react'

import { TaskOlaStatusEnum } from 'modules/task/constants/task'
import { getOlaStatusMap } from 'modules/task/utils/task'

import { Nullable } from 'shared/types/utils'

export const useTaskOlaStatus = (
  olaStatus: Nullable<TaskOlaStatusEnum>,
): ReturnType<typeof getOlaStatusMap> => {
  return useMemo(() => getOlaStatusMap(olaStatus), [olaStatus])
}
