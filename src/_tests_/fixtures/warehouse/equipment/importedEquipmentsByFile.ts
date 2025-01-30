import pick from 'lodash/pick'
import times from 'lodash/times'

import { EquipmentConditionEnum } from 'features/warehouse/constants/equipment'
import { ImportedEquipmentByFile, ImportedEquipmentsByFile } from 'features/warehouse/types'

import currencyFixtures from '_tests_/fixtures/currency'
import macroregionFixtures from '_tests_/fixtures/macroregion'
import warehouseFixtures from '_tests_/fixtures/warehouse'
import { fakeId, fakeInteger, fakeWord } from '_tests_/utils'

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
    ...pick(warehouseFixtures.nomenclature(), 'id', 'title', 'equipmentHasSerialNumber'),
    measurementUnit: fakeWord(),
  },
  owner: pick(warehouseFixtures.customerListItem(), 'id', 'title'),
  macroregion: pick(macroregionFixtures.macroregionListItem(), 'id', 'title'),
  currency: pick(currencyFixtures.currencyListItem(), 'id', 'title'),
  category: pick(warehouseFixtures.equipmentCategory(), 'id', 'title', 'code'),
  purpose: pick(warehouseFixtures.workTypeListItem(), 'id', 'title'),
})

export const importedEquipmentsByFile = (length: number = 1): ImportedEquipmentsByFile =>
  times(length, () => importedEquipmentByFile())
