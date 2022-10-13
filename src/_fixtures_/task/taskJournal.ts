import {
  TaskJournalSourceEnum,
  TaskJournalTypeEnum,
} from 'modules/task/constants/common'
import { TaskJournalModel } from 'modules/task/features/TaskView/models'

export const getEmptyJournalResponseSuccess: TaskJournalModel = []

export const getJournalResponseSuccess: TaskJournalModel = [
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
    task: 1,
    updatedAt: new Date().toISOString(),
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
    task: 1,
    updatedAt: new Date().toISOString(),
  },
]
