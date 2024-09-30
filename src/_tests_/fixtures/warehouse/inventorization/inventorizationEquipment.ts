import { EquipmentConditionEnum } from 'modules/warehouse/constants/equipment'
import { InventorizationEquipmentModel } from 'modules/warehouse/models'

import catalogsFixtures from '_tests_/fixtures/catalogs'
import currencyFixtures from '_tests_/fixtures/currency'
import warehouseFixtures from '_tests_/fixtures/warehouse'
import { fakeId, fakeInteger, fakeWord } from '_tests_/utils'

export const inventorizationEquipment = (): InventorizationEquipmentModel => ({
  quantity: { plan: fakeInteger(), fact: fakeInteger(), diff: fakeInteger() },
  title: fakeWord(),
  category: warehouseFixtures.equipmentCategory(),
  inventoryNumber: fakeWord(),
  serialNumber: fakeWord(),
  condition: EquipmentConditionEnum.Working,
  currency: currencyFixtures.currency(),
  price: fakeInteger(),
  locationFact: catalogsFixtures.locationCatalogListItem(),
  locationPlan: catalogsFixtures.locationCatalogListItem(),
  id: fakeId(),
})
