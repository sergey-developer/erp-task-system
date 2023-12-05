import times from 'lodash/times'

import { EquipmentByFileTemplateTableRow } from 'modules/warehouse/components/EquipmentsByFileTemplateTable/types'
import { EquipmentConditionEnum } from 'modules/warehouse/constants/equipment'

import { fakeId, fakeInteger, fakeWord } from '_tests_/utils'

export const equipmentByFileTemplate = (): EquipmentByFileTemplateTableRow => ({
  id: fakeId(),
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
  nomenclature: { id: fakeId(), title: fakeWord(), measurementUnit: fakeWord() },
  owner: { id: fakeId(), title: fakeWord() },
  currency: { id: fakeId(), title: fakeWord() },
  category: { id: fakeId(), title: fakeWord() },
  purpose: { id: fakeId(), title: fakeWord() },
})

export const equipmentsByFileTemplate = (length: number = 1): EquipmentByFileTemplateTableRow[] =>
  times(length, () => equipmentByFileTemplate())
