import { useMemo } from 'react'

import { TaskOlaStatusEnum } from 'features/task/constants/task'
import { getOlaStatusMap } from 'features/task/utils/task'

import { Nullable } from 'shared/types/utils'

export const useTaskOlaStatus = (
  olaStatus: Nullable<TaskOlaStatusEnum>,
): ReturnType<typeof getOlaStatusMap> => {
  return useMemo(() => getOlaStatusMap(olaStatus), [olaStatus])
}
