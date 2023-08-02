import isEqual from 'lodash/isEqual'

import { TaskOlaStatusEnum } from 'modules/task/constants'

import { BooleanKey, BooleanMap } from 'shared/types/utils'

export const getOlaStatusMap = (
  olaStatus: TaskOlaStatusEnum,
): BooleanMap<BooleanKey<keyof typeof TaskOlaStatusEnum>> => ({
  isExpired: isEqual(olaStatus, TaskOlaStatusEnum.Expired),
  isHalfExpired: isEqual(olaStatus, TaskOlaStatusEnum.HalfExpired),
  isNotExpired: isEqual(olaStatus, TaskOlaStatusEnum.NotExpired),
})
