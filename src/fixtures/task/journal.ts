import times from 'lodash/times'

import { generateDateString, generateId, generateWord } from '_tests_/utils'
import commonFixtures from 'fixtures/common'
import {
  TaskJournalSourceEnum,
  TaskJournalTypeEnum,
} from 'modules/task/constants/common'
import { TaskJournalEntryModel, TaskJournalModel } from 'modules/task/models'

export const getJournalEntry = (
  props?: Partial<Pick<TaskJournalEntryModel, 'type' | 'sourceSystem'>>,
): TaskJournalEntryModel => ({
  id: generateId(),
  type: props?.type || TaskJournalTypeEnum.AssigneeChange,
  description: generateWord(),
  createdAt: generateDateString(),
  sourceSystem: props?.sourceSystem || TaskJournalSourceEnum.ITSM,
  author: commonFixtures.getUser(),
})

export const getJournal = (length: number = 1): TaskJournalModel =>
  times(length, () => getJournalEntry())
