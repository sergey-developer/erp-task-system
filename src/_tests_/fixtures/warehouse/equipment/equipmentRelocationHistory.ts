import times from 'lodash/times'

import { RelocationTaskStatusEnum } from 'modules/warehouse/constants/relocationTask'
import {
  EquipmentRelocationHistoryItemModel,
  EquipmentRelocationHistoryModel,
} from 'modules/warehouse/models'

import { fakeDateString, fakeId, fakeWord } from '_tests_/utils'

export const equipmentRelocationHistoryItem = (): EquipmentRelocationHistoryItemModel => ({
  id: fakeId(),
  relocateTo: fakeWord(),
  relocateFrom: fakeWord(),
  completedAt: fakeDateString(),
  createdAt: fakeDateString(),
  createdBy: fakeWord(),
  status: RelocationTaskStatusEnum.New,
})

export const equipmentRelocationHistory = (length: number = 1): EquipmentRelocationHistoryModel =>
  times(length, () => equipmentRelocationHistoryItem())
