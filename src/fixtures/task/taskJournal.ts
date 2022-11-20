import times from 'lodash/times'

import { generateDateString, generateId, generateWord } from '_tests_/utils'
import * as commonFixtures from 'fixtures/common'
import {
  TaskJournalSourceEnum,
  TaskJournalTypeEnum,
} from 'modules/task/constants/common'
import {
  TaskJournalEntryModel,
  TaskJournalModel,
} from 'modules/task/features/TaskView/models'

export const getTaskJournalEntry = (
  props?: Partial<Pick<TaskJournalEntryModel, 'type' | 'sourceSystem'>>,
): TaskJournalEntryModel => ({
  id: generateId(),
  type: props?.type || TaskJournalTypeEnum.AssigneeChange,
  description: generateWord(),
  createdAt: generateDateString(),
  sourceSystem: props?.sourceSystem || TaskJournalSourceEnum.ITSM,
  author: commonFixtures.getUser(),
})

export const getTaskJournal = (length: number = 1): TaskJournalModel =>
  times(length, () => getTaskJournalEntry())
