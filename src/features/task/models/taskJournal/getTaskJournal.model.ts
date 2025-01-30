import { TaskJournalSourceEnum, TaskJournalTypeEnum } from 'features/task/constants/taskJournal'
import { TaskJournalModel } from 'features/task/models'
import { TaskRequestArgs } from 'features/task/types'

export type GetTaskJournalQueryArgs = TaskRequestArgs &
  Partial<{
    types: TaskJournalTypeEnum[]
    sourceSystems: TaskJournalSourceEnum[]
  }>

export type GetTaskJournalSuccessResponse = TaskJournalModel
