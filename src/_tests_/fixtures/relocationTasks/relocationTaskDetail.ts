import {
  ExternalRelocationStatusEnum,
  RelocationTaskStatusEnum,
  RelocationTaskTypeEnum,
} from 'features/relocationTasks/api/constants'
import { RelocationTaskDetailDTO } from 'features/relocationTasks/api/dto'
import isUndefined from 'lodash/isUndefined'
import pick from 'lodash/pick'

import tasksFixtures from '_tests_/fixtures/tasks'
import userFixtures from '_tests_/fixtures/users'
import { fakeDateString, fakeId, fakeIdStr, fakeWord } from '_tests_/helpers'

import { relocationTaskAttachmentDetail } from './relocationTaskAttachmentDetail'

export const relocationTaskDetail = (
  props?: Partial<
    Pick<RelocationTaskDetailDTO, 'id' | 'status' | 'completedBy' | 'executors' | 'createdBy'>
  >,
): RelocationTaskDetailDTO => ({
  id: props?.id || fakeId(),
  status: props?.status || RelocationTaskStatusEnum.New,
  completedBy: isUndefined(props?.completedBy)
    ? pick(userFixtures.userDetail(), 'id', 'fullName')
    : props!.completedBy,
  executors: isUndefined(props?.executors)
    ? [pick(userFixtures.userDetail(), 'id', 'fullName')]
    : props!.executors,
  createdBy: props?.createdBy
    ? props!.createdBy
    : pick(userFixtures.userDetail(), 'id', 'fullName'),

  type: RelocationTaskTypeEnum.Relocation,
  deadlineAt: fakeDateString(),
  createdAt: fakeDateString(),
  // controllers: [pick(userFixtures.userDetail(), 'id', 'fullName', 'phone')],
  controller: pick(userFixtures.userDetail(), 'id', 'fullName', 'phone'),
  relocateFrom: { id: fakeId(), title: fakeWord() },
  relocateTo: { id: fakeId(), title: fakeWord() },
  comment: fakeWord(),
  documents: [relocationTaskAttachmentDetail()],
  revision: {
    relocationJournalEntry: fakeId(),
    text: fakeWord(),
    createdAt: fakeDateString(),
    user: pick(userFixtures.userDetail(), 'id', 'fullName', 'phone'),
  },
  task: pick(tasksFixtures.taskDetail(), 'id', 'recordId'),
  externalRelocation: {
    id: fakeId(),
    number: fakeIdStr(),
    status: ExternalRelocationStatusEnum.InTransit,
  },
})
