import pick from 'lodash/pick'

import { RelocationTaskStatusEnum } from 'modules/warehouse/constants/relocationTask'
import { RelocationTaskModel } from 'modules/warehouse/models'

import taskFixtures from '_tests_/fixtures/task'
import userFixtures from '_tests_/fixtures/user'
import { fakeDateString, fakeId, fakeWord } from '_tests_/utils'

export const relocationTask = (): RelocationTaskModel => ({
  id: fakeId(),
  deadlineAt: fakeDateString(),
  status: RelocationTaskStatusEnum.New,
  createdAt: fakeDateString(),
  createdBy: pick(userFixtures.user(), 'id', 'fullName'),
  executor: pick(userFixtures.user(), 'id', 'fullName'),
  relocateFrom: { id: fakeId(), title: fakeWord() },
  relocateTo: { id: fakeId(), title: fakeWord() },
  comment: fakeWord(),
  documents: [taskFixtures.attachment()],
})
