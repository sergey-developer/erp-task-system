import isUndefined from 'lodash/isUndefined'
import pick from 'lodash/pick'

import {
  ExternalRelocationStatusEnum,
  RelocationTaskStatusEnum,
  RelocationTaskTypeEnum,
} from 'modules/warehouse/constants/relocationTask'
import { RelocationTaskModel } from 'modules/warehouse/models'

import taskFixtures from '_tests_/fixtures/task'
import userFixtures from '_tests_/fixtures/user'
import { fakeDateString, fakeId, fakeIdStr, fakeWord } from '_tests_/utils'

import { relocationTaskAttachment } from './relocationTaskAttachment'

export const relocationTask = (
  props?: Partial<
    Pick<RelocationTaskModel, 'id' | 'status' | 'completedBy' | 'executors' | 'createdBy'>
  >,
): RelocationTaskModel => ({
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
  controller: pick(userFixtures.user(), 'id', 'fullName'),
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
