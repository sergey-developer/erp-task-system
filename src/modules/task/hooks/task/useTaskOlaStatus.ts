import { useMemo } from 'react'

import { TaskOlaStatusEnum } from 'modules/task/constants/task'
import { getOlaStatusMap } from 'modules/task/utils/task'

export const useTaskOlaStatus = (
  olaStatus: TaskOlaStatusEnum,
): ReturnType<typeof getOlaStatusMap> => {
  return useMemo(() => getOlaStatusMap(olaStatus), [olaStatus])
}
