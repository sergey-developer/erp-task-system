import times from 'lodash/times'

import { EquipmentCatalogListItemModel, EquipmentCatalogListModel } from 'modules/warehouse/models'

import { fakeId, fakeWord } from '_tests_/utils'

export const equipmentCatalogListItem = (): EquipmentCatalogListItemModel => ({
  id: fakeId(),
  title: fakeWord(),
  serialNumber: fakeWord(),
  inventoryNumber: fakeWord(),
})

export const equipmentCatalogList = (length: number = 1): EquipmentCatalogListModel =>
  times(length, () => equipmentCatalogListItem())
