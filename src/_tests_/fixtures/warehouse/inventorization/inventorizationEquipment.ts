import { EquipmentConditionEnum } from 'features/equipments/api/constants'
import { InventorizationEquipmentDetailDTO } from 'features/inventorizations/api/dto'

import catalogsFixtures from '_tests_/fixtures/catalogs'
import currencyFixtures from '_tests_/fixtures/currency'
import warehouseFixtures from '_tests_/fixtures/warehouse'
import { fakeId, fakeInteger, fakeWord } from '_tests_/utils'

export const inventorizationEquipment = (): InventorizationEquipmentDetailDTO => ({
  quantity: { plan: fakeInteger(), fact: fakeInteger(), diff: fakeInteger() },
  title: fakeWord(),
  category: warehouseFixtures.equipmentCategory(),
  inventoryNumber: fakeWord(),
  serialNumber: fakeWord(),
  condition: EquipmentConditionEnum.Working,
  currency: currencyFixtures.currencyListItem(),
  price: fakeInteger(),
  locationFact: catalogsFixtures.locationCatalogListItem(),
  locationPlan: catalogsFixtures.locationCatalogListItem(),
  id: fakeId(),
})
