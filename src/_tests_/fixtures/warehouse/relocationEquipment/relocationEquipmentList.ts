import times from 'lodash/times'

import { EquipmentConditionEnum } from 'modules/warehouse/constants/equipment'
import { RelocationEquipmentListItemModel } from 'modules/warehouse/models'

import currencyFixtures from '_tests_/fixtures/currency'
import { fakeId, fakeInteger, fakeWord } from '_tests_/utils'

export const relocationEquipmentListItem = (): RelocationEquipmentListItemModel => ({
  id: fakeId(),
  title: fakeWord(),
  purpose: fakeWord(),
  quantity: fakeInteger(),
  condition: EquipmentConditionEnum.Working,
  serialNumber: fakeWord(),
  currency: currencyFixtures.currency(),
  price: fakeInteger(),
})

export const relocationEquipmentList = (length: number = 1) =>
  times(length, () => relocationEquipmentListItem())
