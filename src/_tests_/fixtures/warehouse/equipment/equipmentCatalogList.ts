import times from 'lodash/times'

import { EquipmentCatalogListItemModel, EquipmentsCatalogModel } from 'modules/warehouse/models'

import { fakeId, fakeWord } from '_tests_/utils'

export const equipmentCatalogListItem = (): EquipmentCatalogListItemModel => ({
  id: fakeId(),
  title: fakeWord(),
  serialNumber: fakeWord(),
  inventoryNumber: fakeWord(),
})

export const equipmentsCatalog = (length: number = 1): EquipmentsCatalogModel =>
  times(length, () => equipmentCatalogListItem())
