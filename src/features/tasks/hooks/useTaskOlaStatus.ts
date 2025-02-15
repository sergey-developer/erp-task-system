import { TaskOlaStatusEnum } from 'features/tasks/api/constants'
import { getOlaStatusMap } from 'features/tasks/helpers'
import { useMemo } from 'react'

import { Nullable } from 'shared/types/utils'

export const useTaskOlaStatus = (
  olaStatus: Nullable<TaskOlaStatusEnum>,
): ReturnType<typeof getOlaStatusMap> => {
  return useMemo(() => getOlaStatusMap(olaStatus), [olaStatus])
}
