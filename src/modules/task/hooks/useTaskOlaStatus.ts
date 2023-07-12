import { useMemo } from 'react'

import { TaskOlaStatusEnum } from 'modules/task/constants'
import { getOlaStatusMap } from 'modules/task/utils'

export const useTaskOlaStatus = (
  olaStatus: TaskOlaStatusEnum,
): ReturnType<typeof getOlaStatusMap> => {
  return useMemo(() => getOlaStatusMap(olaStatus), [olaStatus])
}
