import { TaskJournalSourceEnum, TaskJournalTypeEnum } from 'features/task/constants/taskJournal'
import { TaskJournalModel } from 'features/task/models'
import { RequestWithTask } from 'features/task/types'

export type GetTaskJournalRequest = RequestWithTask &
  Partial<{
    types: TaskJournalTypeEnum[]
    sourceSystems: TaskJournalSourceEnum[]
  }>

export type GetTaskJournalResponse = TaskJournalModel
