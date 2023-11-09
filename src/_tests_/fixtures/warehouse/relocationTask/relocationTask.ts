import pick from 'lodash/pick'

import {
  RelocationTaskStatusEnum,
  RelocationTaskTypeEnum,
} from 'modules/warehouse/constants/relocationTask'
import { RelocationTaskModel } from 'modules/warehouse/models'

import taskFixtures from '_tests_/fixtures/task'
import userFixtures from '_tests_/fixtures/user'
import { fakeDateString, fakeId, fakeWord } from '_tests_/utils'

export const relocationTask = (
  props?: Partial<Pick<RelocationTaskModel, 'id' | 'status'>>,
): RelocationTaskModel => ({
  id: props?.id || fakeId(),
  status: props?.status || RelocationTaskStatusEnum.New,

  type: RelocationTaskTypeEnum.Relocation,
  deadlineAt: fakeDateString(),
  createdAt: fakeDateString(),
  createdBy: pick(userFixtures.user(), 'id', 'fullName'),
  executor: pick(userFixtures.user(), 'id', 'fullName'),
  relocateFrom: { id: fakeId(), title: fakeWord() },
  relocateTo: { id: fakeId(), title: fakeWord() },
  comment: fakeWord(),
  documents: [taskFixtures.attachment()],
  task: pick(taskFixtures.task(), 'id', 'recordId'),
})
