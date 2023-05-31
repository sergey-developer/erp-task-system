import times from 'lodash/times'

import {
  TaskJournalSourceEnum,
  TaskJournalTypeEnum,
} from 'modules/task/constants/common'
import { TaskJournalEntryModel, TaskJournalModel } from 'modules/task/models'

import commonFixtures from 'fixtures/common'

import { fakeDateString, fakeId, fakeWord } from '_tests_/utils'

import taskFixtures from './index'

export const fakeJournalEntry = (
  props?: Partial<
    Pick<TaskJournalEntryModel, 'type' | 'sourceSystem' | 'attachments'>
  >,
): TaskJournalEntryModel => ({
  type: props?.type || TaskJournalTypeEnum.AssigneeChange,
  sourceSystem: props?.sourceSystem || TaskJournalSourceEnum.ITSM,
  attachments: props?.attachments || [taskFixtures.fakeAttachment()],

  id: fakeId(),
  description: fakeWord(),
  createdAt: fakeDateString(),
  author: commonFixtures.fakeUser(),
})

export const fakeJournal = (length: number = 1): TaskJournalModel =>
  times(length, () => fakeJournalEntry())
