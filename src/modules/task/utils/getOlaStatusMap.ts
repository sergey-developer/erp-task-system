import { TaskOlaStatusEnum } from 'modules/task/constants'

import { BooleanKey, BooleanMap } from 'shared/interfaces/utils'
import { isEqual } from 'shared/utils/common/isEqual'

export const getOlaStatusMap = (
  olaStatus: TaskOlaStatusEnum,
): BooleanMap<BooleanKey<keyof typeof TaskOlaStatusEnum>> => ({
  isExpired: isEqual(olaStatus, TaskOlaStatusEnum.Expired),
  isHalfExpired: isEqual(olaStatus, TaskOlaStatusEnum.HalfExpired),
  isNotExpired: isEqual(olaStatus, TaskOlaStatusEnum.NotExpired),
})
