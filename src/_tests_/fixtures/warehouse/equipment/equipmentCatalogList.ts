import { EquipmentsCatalogDTO, EquipmentsCatalogItemDTO } from 'features/warehouse/models'
import times from 'lodash/times'

import { fakeId, fakeWord } from '_tests_/utils'

export const equipmentCatalogListItem = (): EquipmentsCatalogItemDTO => ({
  id: fakeId(),
  title: fakeWord(),
  serialNumber: fakeWord(),
  inventoryNumber: fakeWord(),
})

export const equipmentsCatalog = (length: number = 1): EquipmentsCatalogDTO =>
  times(length, () => equipmentCatalogListItem())
