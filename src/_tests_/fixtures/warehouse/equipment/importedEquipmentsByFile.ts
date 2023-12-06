import times from 'lodash/times'

import { EquipmentConditionEnum } from 'modules/warehouse/constants/equipment'
import { ImportedEquipmentByFile, ImportedEquipmentsByFile } from 'modules/warehouse/types'

import { fakeId, fakeInteger, fakeWord } from '_tests_/utils'

export const importedEquipmentByFile = (): ImportedEquipmentByFile => ({
  rowId: fakeId(),
  title: fakeWord(),
  customerInventoryNumber: fakeWord(),
  serialNumber: fakeWord(),
  quantity: fakeInteger(),
  comment: fakeWord(),
  price: fakeInteger(),
  usageCounter: fakeInteger(),
  isNew: false,
  isRepaired: false,
  isWarranty: false,
  condition: EquipmentConditionEnum.Working,
  nomenclature: { id: fakeId(), title: fakeWord(), measurementUnit: fakeWord() },
  owner: { id: fakeId(), title: fakeWord() },
  currency: { id: fakeId(), title: fakeWord() },
  category: { id: fakeId(), title: fakeWord() },
  purpose: { id: fakeId(), title: fakeWord() },
})

export const importedEquipmentsByFile = (length: number = 1): ImportedEquipmentsByFile =>
  times(length, () => importedEquipmentByFile())
