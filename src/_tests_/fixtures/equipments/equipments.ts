import { EquipmentConditionEnum } from 'features/equipments/api/constants'
import { EquipmentDTO, EquipmentsDTO } from 'features/equipments/api/dto'
import pick from 'lodash/pick'
import times from 'lodash/times'

import catalogsFixtures from '_tests_/fixtures/catalogs'
import { fakeId, fakeInteger, fakeWord } from '_tests_/helpers'

import { equipmentCategory } from './equipmentCategory'

export const equipment = (): EquipmentDTO => ({
  id: fakeId(),
  title: fakeWord(),
  serialNumber: fakeWord(),
  inventoryNumber: fakeWord(),
  condition: EquipmentConditionEnum.Working,
  quantity: fakeInteger(),
  location: pick(catalogsFixtures.locationCatalogItem(), 'id', 'title'),
  isCredited: false,
  category: pick(equipmentCategory(), 'id', 'title'),
  purpose: pick(catalogsFixtures.workTypeDetail(), 'id', 'title'),
})

export const equipments = (length: number = 1): EquipmentsDTO => times(length, () => equipment())
