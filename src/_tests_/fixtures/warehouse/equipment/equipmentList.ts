import pick from 'lodash/pick'
import times from 'lodash/times'

import { EquipmentConditionEnum } from 'features/warehouse/constants/equipment'
import { EquipmentListItemModel, EquipmentListModel } from 'features/warehouse/models'

import catalogsFixtures from '_tests_/fixtures/catalogs'
import warehouseFixtures from '_tests_/fixtures/warehouse'
import { fakeId, fakeInteger, fakeWord } from '_tests_/utils'

export const equipmentListItem = (): EquipmentListItemModel => ({
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

export const equipmentList = (length: number = 1): EquipmentListModel =>
  times(length, () => equipmentListItem())
