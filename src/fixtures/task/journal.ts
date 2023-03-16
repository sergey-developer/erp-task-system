import times from 'lodash/times'

import {
  TaskJournalSourceEnum,
  TaskJournalTypeEnum,
} from 'modules/task/constants/common'
import { TaskJournalEntryModel, TaskJournalModel } from 'modules/task/models'

import commonFixtures from 'fixtures/common'

import { fakeDateString, fakeId, fakeWord } from '_tests_/utils'

export const getJournalEntry = (
  props?: Partial<Pick<TaskJournalEntryModel, 'type' | 'sourceSystem'>>,
): TaskJournalEntryModel => ({
  id: fakeId(),
  type: props?.type || TaskJournalTypeEnum.AssigneeChange,
  description: fakeWord(),
  createdAt: fakeDateString(),
  sourceSystem: props?.sourceSystem || TaskJournalSourceEnum.ITSM,
  author: commonFixtures.getUser(),
})

export const getJournal = (length: number = 1): TaskJournalModel =>
  times(length, () => getJournalEntry())
