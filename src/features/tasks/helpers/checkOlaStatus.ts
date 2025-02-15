import isEqual from 'lodash/isEqual'

import { TaskOlaStatusEnum } from 'features/tasks/api/constants'

import { BooleanKey, BooleanMap, Nullable } from 'shared/types/utils'

export const checkOlaStatusExpired = (olaStatus: Nullable<TaskOlaStatusEnum>): boolean =>
  isEqual(olaStatus, TaskOlaStatusEnum.Expired)

export const checkOlaStatusHalfExpired = (olaStatus: Nullable<TaskOlaStatusEnum>): boolean =>
  isEqual(olaStatus, TaskOlaStatusEnum.HalfExpired)

export const getOlaStatusMap = (
  olaStatus: Nullable<TaskOlaStatusEnum>,
): BooleanMap<BooleanKey<keyof typeof TaskOlaStatusEnum>> => ({
  isExpired: checkOlaStatusExpired(olaStatus),
  isHalfExpired: checkOlaStatusHalfExpired(olaStatus),
  isNotExpired: isEqual(olaStatus, TaskOlaStatusEnum.NotExpired),
})
