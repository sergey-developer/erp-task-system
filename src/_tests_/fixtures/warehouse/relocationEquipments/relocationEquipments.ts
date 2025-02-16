import { EquipmentConditionEnum } from 'features/equipments/api/constants'
import { RelocationEquipmentDTO } from 'features/relocationTasks/api/dto'
import pick from 'lodash/pick'
import times from 'lodash/times'

import currencyFixtures from '_tests_/fixtures/currencies'
import warehouseFixtures from '_tests_/fixtures/warehouse'
import { fakeId, fakeInteger, fakeWord } from '_tests_/helpers'

export const relocationEquipmentListItem = (): RelocationEquipmentDTO => ({
  id: fakeId(),
  relocationEquipmentId: fakeId(),
  title: fakeWord(),
  purpose: fakeWord(),
  quantity: fakeInteger(),
  condition: EquipmentConditionEnum.Working,
  serialNumber: fakeWord(),
  currency: currencyFixtures.currency(),
  price: fakeInteger(),
  category: pick(warehouseFixtures.equipmentCategory(), 'id', 'title', 'code'),
})

export const relocationEquipments = (length: number = 1) =>
  times(length, () => relocationEquipmentListItem())
