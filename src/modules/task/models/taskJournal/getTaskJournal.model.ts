import { TaskJournalSourceEnum, TaskJournalTypeEnum } from 'modules/task/constants/taskJournal'
import { TaskJournalModel } from 'modules/task/models'
import { TaskRequestArgs } from 'modules/task/types'

export type GetTaskJournalQueryArgs = TaskRequestArgs &
  Partial<{
    types: TaskJournalTypeEnum[]
    sourceSystems: TaskJournalSourceEnum[]
  }>

export type GetTaskJournalSuccessResponse = TaskJournalModel
