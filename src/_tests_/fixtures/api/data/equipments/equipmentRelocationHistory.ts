import {
  EquipmentRelocationHistoryDTO,
  EquipmentRelocationHistoryItemDTO,
} from 'features/equipments/api/dto'
import { RelocationTaskStatusEnum } from 'features/relocationTasks/api/constants'
import pick from 'lodash/pick'
import times from 'lodash/times'

import { fakeDateString, fakeId, fakeWord } from '_tests_/helpers'

import relocationTasksFixtures from '../relocationTasks'
import { equipmentRelocationHistoryAttachment } from './equipmentRelocationHistoryAttachment'

export const equipmentRelocationHistoryItem = (): EquipmentRelocationHistoryItemDTO => ({
  id: fakeId(),
  relocateTo: fakeWord(),
  relocateFrom: fakeWord(),
  completedAt: fakeDateString(),
  createdAt: fakeDateString(),
  createdBy: fakeWord(),
  status: RelocationTaskStatusEnum.New,
  externalRelocation: pick(
    relocationTasksFixtures.relocationTaskDetail().externalRelocation!,
    'number',
  ),
  documents: [equipmentRelocationHistoryAttachment()],
})

export const equipmentRelocationHistory = (length: number = 1): EquipmentRelocationHistoryDTO =>
  times(length, () => equipmentRelocationHistoryItem())
