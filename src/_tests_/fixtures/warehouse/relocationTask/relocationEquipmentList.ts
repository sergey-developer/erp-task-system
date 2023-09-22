import times from 'lodash/times'

import { EquipmentConditionEnum } from 'modules/warehouse/constants/equipment'
import { RelocationEquipmentListItemModel } from 'modules/warehouse/models'

import { fakeId, fakeInteger, fakeWord } from '_tests_/utils'

export const relocationEquipmentListItem = (): RelocationEquipmentListItemModel => ({
  id: fakeId(),
  title: fakeWord(),
  serialNumber: fakeWord(),
  condition: EquipmentConditionEnum.Working,
  purpose: fakeWord(),
  quantity: fakeInteger(),
})

export const relocationEquipmentList = (length: number = 1) =>
  times(length, () => relocationEquipmentListItem())
