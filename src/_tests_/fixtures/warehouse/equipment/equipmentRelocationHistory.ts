import pick from 'lodash/pick'
import times from 'lodash/times'

import { RelocationTaskStatusEnum } from 'modules/warehouse/constants/relocationTask'
import {
  EquipmentRelocationHistoryItemModel,
  EquipmentRelocationHistoryModel,
} from 'modules/warehouse/models'

import warehouseFixtures from '_tests_/fixtures/warehouse'
import { fakeDateString, fakeId, fakeWord } from '_tests_/utils'

export const equipmentRelocationHistoryItem = (): EquipmentRelocationHistoryItemModel => ({
  id: fakeId(),
  relocateTo: fakeWord(),
  relocateFrom: fakeWord(),
  completedAt: fakeDateString(),
  createdAt: fakeDateString(),
  createdBy: fakeWord(),
  status: RelocationTaskStatusEnum.New,
  externalRelocation: pick(warehouseFixtures.relocationTask().externalRelocation!, 'number'),
  documents: [warehouseFixtures.equipmentRelocationHistoryAttachment()],
})

export const equipmentRelocationHistory = (length: number = 1): EquipmentRelocationHistoryModel =>
  times(length, () => equipmentRelocationHistoryItem())
