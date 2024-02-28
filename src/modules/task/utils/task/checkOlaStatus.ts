import isEqual from 'lodash/isEqual'

import { TaskOlaStatusEnum } from 'modules/task/constants/task'

import { BooleanKey, BooleanMap } from 'shared/types/utils'

export const checkOlaStatusExpired = (olaStatus: TaskOlaStatusEnum): boolean =>
  isEqual(olaStatus, TaskOlaStatusEnum.Expired)

export const checkOlaStatusHalfExpired = (olaStatus: TaskOlaStatusEnum): boolean =>
  isEqual(olaStatus, TaskOlaStatusEnum.HalfExpired)

export const getOlaStatusMap = (
  olaStatus: TaskOlaStatusEnum,
): BooleanMap<BooleanKey<keyof typeof TaskOlaStatusEnum>> => ({
  isExpired: checkOlaStatusExpired(olaStatus),
  isHalfExpired: checkOlaStatusHalfExpired(olaStatus),
  isNotExpired: isEqual(olaStatus, TaskOlaStatusEnum.NotExpired),
})
