import { EquipmentConditionEnum } from 'features/equipments/api/constants'
import { ImportedEquipmentByFile, ImportedEquipmentsByFile } from 'features/equipments/types'
import pick from 'lodash/pick'
import times from 'lodash/times'

import catalogsFixtures from '_tests_/fixtures/catalogs'
import { fakeId, fakeInteger, fakeWord } from '_tests_/helpers'

import nomenclaturesFixtures from '../nomenclatures'
import { equipmentCategory } from './equipmentCategory'

export const importedEquipmentByFile = (): ImportedEquipmentByFile => ({
  rowId: fakeId(),
  title: fakeWord(),
  inventoryNumber: fakeWord(),
  serialNumber: fakeWord(),
  quantity: fakeInteger(),
  comment: fakeWord(),
  price: fakeInteger(),
  usageCounter: fakeInteger(),
  isNew: false,
  isRepaired: false,
  isWarranty: false,
  condition: EquipmentConditionEnum.Working,
  nomenclature: {
    ...pick(nomenclaturesFixtures.nomenclatureDetail(), 'id', 'title', 'equipmentHasSerialNumber'),
    measurementUnit: fakeWord(),
  },
  owner: pick(catalogsFixtures.customerCatalogItem(), 'id', 'title'),
  macroregion: pick(catalogsFixtures.macroregionCatalogItem(), 'id', 'title'),
  currency: pick(catalogsFixtures.currencyCatalogItem(), 'id', 'title'),
  category: pick(equipmentCategory(), 'id', 'title', 'code'),
  purpose: pick(catalogsFixtures.workTypeCatalogItem(), 'id', 'title'),
})

export const importedEquipmentsByFile = (length: number = 1): ImportedEquipmentsByFile =>
  times(length, () => importedEquipmentByFile())
