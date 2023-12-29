import times from 'lodash/times'

import {
  EquipmentCategoryEnum,
  EquipmentConditionEnum,
} from 'modules/warehouse/constants/equipment'
import { ImportedEquipmentByFile, ImportedEquipmentsByFile } from 'modules/warehouse/types'

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
    id: fakeId(),
    title: fakeWord(),
    measurementUnit: fakeWord(),
    equipmentHasSerialNumber: false,
  },
  owner: { id: fakeId(), title: fakeWord() },
  currency: { id: fakeId(), title: fakeWord() },
  category: { id: fakeId(), title: fakeWord(), code: EquipmentCategoryEnum.Equipment },
  purpose: { id: fakeId(), title: fakeWord() },
})

export const importedEquipmentsByFile = (length: number = 1): ImportedEquipmentsByFile =>
  times(length, () => importedEquipmentByFile())
