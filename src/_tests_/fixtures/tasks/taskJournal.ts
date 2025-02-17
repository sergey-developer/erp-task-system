import { TaskJournalSourceEnum, TaskJournalTypeEnum } from 'features/tasks/api/constants'
import { TaskJournalDTO, TaskJournalItemDTO } from 'features/tasks/api/dto'
import times from 'lodash/times'

import tasksFixtures from '_tests_/fixtures/tasks'
import userFixtures from '_tests_/fixtures/users'
import { fakeDateString, fakeId, fakeWord } from '_tests_/helpers'

export const taskJournalItem = (
  props?: Partial<Pick<TaskJournalItemDTO, 'type' | 'sourceSystem' | 'attachments'>>,
): TaskJournalItemDTO => ({
  type: props?.type || TaskJournalTypeEnum.AssigneeChange,
  sourceSystem: props?.sourceSystem || TaskJournalSourceEnum.ITSM,
  attachments: props?.attachments || [tasksFixtures.taskAttachment()],

  id: fakeId(),
  description: fakeWord(),
  createdAt: fakeDateString(),
  author: userFixtures.baseUser(),
})

export const taskJournal = (length: number = 1): TaskJournalDTO =>
  times(length, () => taskJournalItem())
