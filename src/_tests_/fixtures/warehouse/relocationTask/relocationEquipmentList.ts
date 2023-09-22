import times from 'lodash/times'

import { RelocationEquipmentListItemModel } from 'modules/warehouse/models'

import { fakeId, fakeInteger, fakeWord } from '_tests_/utils'

export const relocationEquipmentListItem = (): RelocationEquipmentListItemModel => ({
  id: fakeId(),
  title: fakeWord(),
  serialNumber: fakeWord(),
  condition: fakeWord(),
  purpose: fakeWord(),
  quantity: fakeInteger(),
})

export const relocationEquipmentList = (length: number = 1) =>
  times(length, () => relocationEquipmentListItem())
