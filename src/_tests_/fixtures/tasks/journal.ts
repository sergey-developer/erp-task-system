import { TaskJournalItemDTO, TaskJournalDTO } from 'features/tasks/api/dto'
import { TaskJournalSourceEnum, TaskJournalTypeEnum } from 'features/tasks/constants/taskJournal'
import times from 'lodash/times'

import taskFixtures from '_tests_/fixtures/tasks'
import userFixtures from '_tests_/fixtures/users'
import { fakeDateString, fakeId, fakeWord } from '_tests_/utils'

export const journalEntry = (
  props?: Partial<Pick<TaskJournalItemDTO, 'type' | 'sourceSystem' | 'attachments'>>,
): TaskJournalItemDTO => ({
  type: props?.type || TaskJournalTypeEnum.AssigneeChange,
  sourceSystem: props?.sourceSystem || TaskJournalSourceEnum.ITSM,
  attachments: props?.attachments || [taskFixtures.attachment()],

  id: fakeId(),
  description: fakeWord(),
  createdAt: fakeDateString(),
  author: userFixtures.baseUser(),
})

export const journal = (length: number = 1): TaskJournalDTO => times(length, () => journalEntry())
