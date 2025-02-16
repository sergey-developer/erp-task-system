import { EquipmentCategoryEnum, EquipmentConditionEnum } from 'features/equipments/api/constants'
import {
  EquipmentByFileTableRow,
  EquipmentsByFileTableProps,
} from 'features/equipments/components/EquipmentsByFileTable/types'

import { fakeId, fakeInteger, fakeWord } from '_tests_/helpers'

export const tableRow: EquipmentByFileTableRow = {
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
}

export const props: Readonly<EquipmentsByFileTableProps> = {
  dataSource: [tableRow],
  onEdit: jest.fn(),
  errors: undefined,
}

export enum TestIdsEnum {
  EquipmentsByFileTable = 'equipments-by-file-table',
}
