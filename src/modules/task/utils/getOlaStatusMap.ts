import { TaskOlaStatusEnum } from 'modules/task/constants/common'

import { BooleanMap } from 'shared/interfaces/utils'
import { isEqual } from 'shared/utils/common/isEqual'

const getOlaStatusMap = (
  olaStatus: TaskOlaStatusEnum,
): BooleanMap<`is${keyof typeof TaskOlaStatusEnum}`> => ({
  isExpired: isEqual(olaStatus, TaskOlaStatusEnum.Expired),
  isHalfExpired: isEqual(olaStatus, TaskOlaStatusEnum.HalfExpired),
  isNotExpired: isEqual(olaStatus, TaskOlaStatusEnum.NotExpired),
})

export default getOlaStatusMap
