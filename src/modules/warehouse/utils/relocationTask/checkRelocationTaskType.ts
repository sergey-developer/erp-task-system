import { RelocationTaskTypeEnum } from 'modules/warehouse/constants/relocationTask'

import { BooleanKey, BooleanMap } from 'shared/types/utils'

export const checkRelocationTaskTypeIsWriteOff = (type?: RelocationTaskTypeEnum): boolean =>
  type === RelocationTaskTypeEnum.WriteOff

type GetRelocationTaskTypeResult = BooleanMap<BooleanKey<keyof typeof RelocationTaskTypeEnum>>

export const checkRelocationTaskType = (
  type?: RelocationTaskTypeEnum,
): GetRelocationTaskTypeResult => ({
  isRelocation: type === RelocationTaskTypeEnum.Relocation,
  isRepair: type === RelocationTaskTypeEnum.Repair,
  isWarranty: type === RelocationTaskTypeEnum.Warranty,
  isWriteOff: checkRelocationTaskTypeIsWriteOff(type),
})
