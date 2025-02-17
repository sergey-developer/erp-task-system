import {
  RelocationTaskStatusEnum,
  RelocationTaskTypeEnum,
} from 'features/relocationTasks/api/constants'
import { RelocationTaskDTO } from 'features/relocationTasks/api/dto'
import isUndefined from 'lodash/isUndefined'
import pick from 'lodash/pick'
import times from 'lodash/times'

import tasksFixtures from '_tests_/fixtures/tasks'
import userFixtures from '_tests_/fixtures/users'
import { fakeDateString, fakeId, fakeWord } from '_tests_/helpers'

export const relocationTaskListItem = (
  props?: Partial<Pick<RelocationTaskDTO, 'completedBy' | 'executors'>>,
): RelocationTaskDTO => ({
  completedBy: isUndefined(props?.completedBy)
    ? pick(userFixtures.userDetail(), 'id', 'fullName', 'phone')
    : props!.completedBy,
  executors: isUndefined(props?.executors)
    ? [pick(userFixtures.userDetail(), 'id', 'fullName', 'phone')]
    : props!.executors,

  id: fakeId(),
  type: RelocationTaskTypeEnum.Relocation,
  deadlineAt: fakeDateString(),
  status: RelocationTaskStatusEnum.New,
  createdAt: fakeDateString(),
  createdBy: pick(userFixtures.userDetail(), 'id', 'fullName'),
  controller: pick(userFixtures.userDetail(), 'id', 'fullName'),
  relocateFrom: { id: fakeId(), title: fakeWord() },
  relocateTo: { id: fakeId(), title: fakeWord() },
  documents: [tasksFixtures.taskAttachment()],
})

export const relocationTasks = (length: number = 1) => times(length, () => relocationTaskListItem())
