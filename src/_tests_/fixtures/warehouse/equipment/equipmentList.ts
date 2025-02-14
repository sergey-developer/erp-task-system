import { EquipmentConditionEnum } from 'features/equipments/api/constants'
import { EquipmentDTO, EquipmentListModel } from 'features/warehouse/models'
import pick from 'lodash/pick'
import times from 'lodash/times'

import catalogsFixtures from '_tests_/fixtures/catalogs'
import warehouseFixtures from '_tests_/fixtures/warehouse'
import { fakeId, fakeInteger, fakeWord } from '_tests_/utils'

export const equipmentListItem = (): EquipmentDTO => ({
  id: fakeId(),
  title: fakeWord(),
  serialNumber: fakeWord(),
  inventoryNumber: fakeWord(),
  condition: EquipmentConditionEnum.Working,
  quantity: fakeInteger(),
  location: pick(catalogsFixtures.locationCatalogListItem(), 'id', 'title'),
  isCredited: false,
  category: pick(warehouseFixtures.equipmentCategory(), 'id', 'title'),
  purpose: pick(warehouseFixtures.workType(), 'id', 'title'),
})

export const equipments = (length: number = 1): EquipmentListModel =>
  times(length, () => equipmentListItem())
