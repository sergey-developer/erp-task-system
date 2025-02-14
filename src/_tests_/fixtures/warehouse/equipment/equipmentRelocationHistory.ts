import {
  EquipmentRelocationHistoryDTO,
  EquipmentRelocationHistoryItemDTO,
} from 'features/equipments/api/dto'
import { RelocationTaskStatusEnum } from 'features/relocationTasks/constants'
import pick from 'lodash/pick'
import times from 'lodash/times'

import warehouseFixtures from '_tests_/fixtures/warehouse'
import { fakeDateString, fakeId, fakeWord } from '_tests_/utils'

export const equipmentRelocationHistoryItem = (): EquipmentRelocationHistoryItemDTO => ({
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

export const equipmentRelocationHistory = (length: number = 1): EquipmentRelocationHistoryDTO =>
  times(length, () => equipmentRelocationHistoryItem())
