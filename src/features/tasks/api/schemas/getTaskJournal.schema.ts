import { TaskJournalSourceEnum, TaskJournalTypeEnum } from 'features/tasks/api/constants'
import { TaskJournalDTO } from 'features/tasks/api/dto'
import { RequestWithTask } from 'features/tasks/api/types'

export type GetTaskJournalRequest = RequestWithTask &
  Partial<{
    types: TaskJournalTypeEnum[]
    sourceSystems: TaskJournalSourceEnum[]
  }>

export type GetTaskJournalResponse = TaskJournalDTO
