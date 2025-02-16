import { EquipmentConditionEnum } from 'features/equipments/api/constants'
import { InventorizationEquipmentDetailDTO } from 'features/inventorizations/api/dto'

import catalogsFixtures from '_tests_/fixtures/catalogs'
import currencyFixtures from '_tests_/fixtures/currencies'
import warehouseFixtures from '_tests_/fixtures/warehouse'
import { fakeId, fakeInteger, fakeWord } from '_tests_/helpers'

export const inventorizationEquipment = (): InventorizationEquipmentDetailDTO => ({
  quantity: { plan: fakeInteger(), fact: fakeInteger(), diff: fakeInteger() },
  title: fakeWord(),
  category: warehouseFixtures.equipmentCategory(),
  inventoryNumber: fakeWord(),
  serialNumber: fakeWord(),
  condition: EquipmentConditionEnum.Working,
  currency: currencyFixtures.currency(),
  price: fakeInteger(),
  locationFact: catalogsFixtures.locationCatalogItem(),
  locationPlan: catalogsFixtures.locationCatalogItem(),
  id: fakeId(),
})
