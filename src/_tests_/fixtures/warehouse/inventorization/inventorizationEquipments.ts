import pick from 'lodash/pick'
import times from 'lodash/times'

import { InventorizationEquipmentListItemModel } from 'modules/warehouse/models'

import catalogsFixtures from '_tests_/fixtures/catalogs'
import warehouseFixtures from '_tests_/fixtures/warehouse'
import { fakeId, fakeIdStr, fakeInteger, fakeWord } from '_tests_/utils'

export const inventorizationEquipmentListItem = (): InventorizationEquipmentListItemModel => ({
  id: fakeId(),
  locationPlan: catalogsFixtures.location(),
  locationFact: catalogsFixtures.location(),
  equipment: {
    id: fakeId(),
    title: fakeWord(),
    serialNumber: fakeIdStr(),
    inventoryNumber: fakeIdStr(),
    category: pick(warehouseFixtures.equipmentCategory(), 'id', 'title', 'code'),
  },
  quantity: { plan: fakeInteger(), fact: fakeInteger(), diff: fakeInteger() },
  isFilled: true,
  hasDiff: true,
})

export const inventorizationEquipments = (length: number = 1) =>
  times(length, () => inventorizationEquipmentListItem())
