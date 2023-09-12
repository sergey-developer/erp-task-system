import times from 'lodash/times'

import { TaskJournalSourceEnum, TaskJournalTypeEnum } from 'modules/task/constants'
import { TaskJournalEntryModel, TaskJournalModel } from 'modules/task/models'

import taskFixtures from '_tests_/fixtures/task'
import userFixtures from '_tests_/fixtures/user'
import { fakeDateString, fakeId, fakeWord } from '_tests_/utils'

export const journalEntry = (
  props?: Partial<Pick<TaskJournalEntryModel, 'type' | 'sourceSystem' | 'attachments'>>,
): TaskJournalEntryModel => ({
  type: props?.type || TaskJournalTypeEnum.AssigneeChange,
  sourceSystem: props?.sourceSystem || TaskJournalSourceEnum.ITSM,
  attachments: props?.attachments || [taskFixtures.attachment()],

  id: fakeId(),
  description: fakeWord(),
  createdAt: fakeDateString(),
  author: userFixtures.baseUser(),
})

export const journal = (length: number = 1): TaskJournalModel => times(length, () => journalEntry())
