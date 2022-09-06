import { generateId } from '_tests_/utils'
import {
  TaskJournalSourceEnum,
  TaskJournalTypeEnum,
} from 'modules/task/constants/enums'
import { TaskJournalEntryModel } from 'modules/task/features/TaskView/models'

import { JournalEntryProps } from '../JournalEntry'

type FakeJournalEntry = Omit<
  TaskJournalEntryModel,
  'updatedAt' | 'recordId' | 'task'
>

export type FakeJournalResponse = Array<FakeJournalEntry>

export const FAKE_TASK_ID = generateId()

export const getEmptyJournalResponseSuccess: FakeJournalResponse = []

export const getJournalResponseSuccess: FakeJournalResponse = [
  {
    id: 1,
    createdAt: new Date().toISOString(),
    type: TaskJournalTypeEnum.AssigneeChange,
    description: 'Выполнено переназначение 1',
    sourceSystem: TaskJournalSourceEnum.X5,
    author: {
      id: 1,
      firstName: 'Александр 1',
      lastName: 'Александров 1',
      middleName: 'Александрович 1',
    },
  },
  {
    id: 2,
    createdAt: new Date().toISOString(),
    type: TaskJournalTypeEnum.Attachment,
    description: 'Выполнено переназначение 2',
    sourceSystem: TaskJournalSourceEnum.ITSM,
    author: {
      id: 2,
      firstName: 'Александр 2',
      lastName: 'Александров 2',
      middleName: 'Александрович 2',
    },
  },
]

export const fakeJournalEntry: JournalEntryProps = {
  type: TaskJournalTypeEnum.StatusChange,
  createdAt: new Date().toISOString(),
  description: 'Выполнено переназначение',
  sourceSystem: TaskJournalSourceEnum.X5,
  author: 'Александров Александр Александрович',
}
