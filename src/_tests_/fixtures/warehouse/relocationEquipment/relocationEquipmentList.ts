import pick from 'lodash/pick'
import times from 'lodash/times'

import { EquipmentConditionEnum } from 'features/warehouse/constants/equipment'
import { RelocationEquipmentListItemModel } from 'features/warehouse/models'

import currencyFixtures from '_tests_/fixtures/currency'
import warehouseFixtures from '_tests_/fixtures/warehouse'
import { fakeId, fakeInteger, fakeWord } from '_tests_/utils'

export const relocationEquipmentListItem = (): RelocationEquipmentListItemModel => ({
  id: fakeId(),
  relocationEquipmentId: fakeId(),
  title: fakeWord(),
  purpose: fakeWord(),
  quantity: fakeInteger(),
  condition: EquipmentConditionEnum.Working,
  serialNumber: fakeWord(),
  currency: currencyFixtures.currencyListItem(),
  price: fakeInteger(),
  category: pick(warehouseFixtures.equipmentCategory(), 'id', 'title', 'code'),
})

export const relocationEquipmentList = (length: number = 1) =>
  times(length, () => relocationEquipmentListItem())
