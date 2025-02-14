import {
  ExternalRelocationStatusEnum,
  RelocationTaskStatusEnum,
  RelocationTaskTypeEnum,
} from 'features/relocationTasks/constants'
import { RelocationTaskDetailDTO } from 'features/warehouse/models'
import isUndefined from 'lodash/isUndefined'
import pick from 'lodash/pick'

import taskFixtures from '_tests_/fixtures/task'
import userFixtures from '_tests_/fixtures/user'
import { fakeDateString, fakeId, fakeIdStr, fakeWord } from '_tests_/utils'

import { relocationTaskAttachment } from './relocationTaskAttachment'

export const relocationTask = (
  props?: Partial<
    Pick<RelocationTaskDetailDTO, 'id' | 'status' | 'completedBy' | 'executors' | 'createdBy'>
  >,
): RelocationTaskDetailDTO => ({
  id: props?.id || fakeId(),
  status: props?.status || RelocationTaskStatusEnum.New,
  completedBy: isUndefined(props?.completedBy)
    ? pick(userFixtures.user(), 'id', 'fullName')
    : props!.completedBy,
  executors: isUndefined(props?.executors)
    ? [pick(userFixtures.user(), 'id', 'fullName')]
    : props!.executors,
  createdBy: props?.createdBy ? props!.createdBy : pick(userFixtures.user(), 'id', 'fullName'),

  type: RelocationTaskTypeEnum.Relocation,
  deadlineAt: fakeDateString(),
  createdAt: fakeDateString(),
  // controllers: [pick(userFixtures.user(), 'id', 'fullName', 'phone')],
  controller: pick(userFixtures.user(), 'id', 'fullName', 'phone'),
  relocateFrom: { id: fakeId(), title: fakeWord() },
  relocateTo: { id: fakeId(), title: fakeWord() },
  comment: fakeWord(),
  documents: [relocationTaskAttachment()],
  revision: {
    relocationJournalEntry: fakeId(),
    text: fakeWord(),
    createdAt: fakeDateString(),
    user: pick(userFixtures.user(), 'id', 'fullName', 'phone'),
  },
  task: pick(taskFixtures.task(), 'id', 'recordId'),
  externalRelocation: {
    id: fakeId(),
    number: fakeIdStr(),
    status: ExternalRelocationStatusEnum.InTransit,
  },
})
