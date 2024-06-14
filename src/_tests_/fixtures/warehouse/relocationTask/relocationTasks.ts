import isUndefined from 'lodash/isUndefined'
import pick from 'lodash/pick'
import times from 'lodash/times'

import {
  RelocationTaskStatusEnum,
  RelocationTaskTypeEnum,
} from 'modules/warehouse/constants/relocationTask'
import { RelocationTaskListItemModel } from 'modules/warehouse/models'

import taskFixtures from '_tests_/fixtures/task'
import userFixtures from '_tests_/fixtures/user'
import { fakeDateString, fakeId, fakeWord } from '_tests_/utils'

export const relocationTaskListItem = (
  props?: Partial<Pick<RelocationTaskListItemModel, 'completedBy' | 'executors'>>,
): RelocationTaskListItemModel => ({
  completedBy: isUndefined(props?.completedBy)
    ? pick(userFixtures.user(), 'id', 'fullName', 'phone')
    : props!.completedBy,
  executors: isUndefined(props?.executors)
    ? [pick(userFixtures.user(), 'id', 'fullName', 'phone')]
    : props!.executors,

  id: fakeId(),
  type: RelocationTaskTypeEnum.Relocation,
  deadlineAt: fakeDateString(),
  status: RelocationTaskStatusEnum.New,
  createdAt: fakeDateString(),
  createdBy: pick(userFixtures.user(), 'id', 'fullName'),
  controller: pick(userFixtures.user(), 'id', 'fullName'),
  relocateFrom: { id: fakeId(), title: fakeWord() },
  relocateTo: { id: fakeId(), title: fakeWord() },
  documents: [taskFixtures.attachment()],
})

export const relocationTasks = (length: number = 1) => times(length, () => relocationTaskListItem())
