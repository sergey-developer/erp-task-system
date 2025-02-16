import { EquipmentConditionEnum } from 'features/equipments/api/constants'
import { ImportedEquipmentByFile, ImportedEquipmentsByFile } from 'features/equipments/types'
import pick from 'lodash/pick'
import times from 'lodash/times'

import currencyFixtures from '_tests_/fixtures/currencies'
import macroregionFixtures from '_tests_/fixtures/macroregions'
import warehouseFixtures from '_tests_/fixtures/warehouse'
import { fakeId, fakeInteger, fakeWord } from '_tests_/helpers'

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
  macroregion: pick(macroregionFixtures.macroregion(), 'id', 'title'),
  currency: pick(currencyFixtures.currency(), 'id', 'title'),
  category: pick(warehouseFixtures.equipmentCategory(), 'id', 'title', 'code'),
  purpose: pick(warehouseFixtures.workTypeListItem(), 'id', 'title'),
})

export const importedEquipmentsByFile = (length: number = 1): ImportedEquipmentsByFile =>
  times(length, () => importedEquipmentByFile())
