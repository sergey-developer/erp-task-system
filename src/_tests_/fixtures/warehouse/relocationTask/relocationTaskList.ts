import pick from 'lodash/pick'
import times from 'lodash/times'

import {
  RelocationTaskStatusEnum,
  RelocationTaskTypeEnum,
} from 'modules/warehouse/constants/relocationTask'
import { RelocationTaskListItemModel } from 'modules/warehouse/models'

import userFixtures from '_tests_/fixtures/user'
import { fakeDateString, fakeId, fakeWord } from '_tests_/utils'

export const relocationTaskListItem = (): RelocationTaskListItemModel => ({
  id: fakeId(),
  type: RelocationTaskTypeEnum.Relocation,
  deadlineAt: fakeDateString(),
  status: RelocationTaskStatusEnum.New,
  createdAt: fakeDateString(),
  createdBy: pick(userFixtures.user(), 'id', 'fullName'),
  executor: pick(userFixtures.user(), 'id', 'fullName'),
  relocateFrom: { id: fakeId(), title: fakeWord() },
  relocateTo: { id: fakeId(), title: fakeWord() },
})

export const relocationTaskList = (length: number = 1) =>
  times(length, () => relocationTaskListItem())
