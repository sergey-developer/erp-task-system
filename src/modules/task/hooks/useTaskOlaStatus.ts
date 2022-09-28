import { useMemo } from 'react'

import { TaskOlaStatusEnum } from 'modules/task/constants/common'
import getOlaStatusMap from 'modules/task/utils/getOlaStatusMap'

const useTaskOlaStatus = (
  olaStatus: TaskOlaStatusEnum,
): ReturnType<typeof getOlaStatusMap> => {
  return useMemo(() => getOlaStatusMap(olaStatus), [olaStatus])
}

export default useTaskOlaStatus
