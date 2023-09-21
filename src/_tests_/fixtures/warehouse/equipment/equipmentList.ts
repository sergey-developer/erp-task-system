import times from 'lodash/times'

import { EquipmentConditionEnum } from 'modules/warehouse/constants/equipment'
import {
  EquipmentListItemModel,
  EquipmentListModel,
} from 'modules/warehouse/models'

import { fakeId, fakeInteger, fakeWord } from '_tests_/utils'

export const equipmentListItem = (): EquipmentListItemModel => ({
  id: fakeId(),
  title: fakeWord(),
  serialNumber: fakeWord(),
  inventoryNumber: fakeWord(),
  condition: EquipmentConditionEnum.Working,
  quantity: fakeInteger(),
  warehouse: {
    id: fakeId(),
    title: fakeWord(),
  },
  category: {
    id: fakeId(),
    title: fakeWord(),
  },
  purpose: {
    id: fakeId(),
    title: fakeWord(),
  },
})

export const equipmentList = (length: number = 1): EquipmentListModel =>
  times(length, () => equipmentListItem())
