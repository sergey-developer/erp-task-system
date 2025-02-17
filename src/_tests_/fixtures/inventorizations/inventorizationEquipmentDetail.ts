import { EquipmentConditionEnum } from 'features/equipments/api/constants'
import { InventorizationEquipmentDetailDTO } from 'features/inventorizations/api/dto'

import catalogsFixtures from '_tests_/fixtures/catalogs'
import equipmentsFixtures from '_tests_/fixtures/equipments'
import { fakeId, fakeInteger, fakeWord } from '_tests_/helpers'

export const inventorizationEquipmentDetail = (): InventorizationEquipmentDetailDTO => ({
  quantity: { plan: fakeInteger(), fact: fakeInteger(), diff: fakeInteger() },
  title: fakeWord(),
  category: equipmentsFixtures.equipmentCategory(),
  inventoryNumber: fakeWord(),
  serialNumber: fakeWord(),
  condition: EquipmentConditionEnum.Working,
  currency: catalogsFixtures.currencyCatalogItem(),
  price: fakeInteger(),
  locationFact: catalogsFixtures.locationCatalogItem(),
  locationPlan: catalogsFixtures.locationCatalogItem(),
  id: fakeId(),
})
