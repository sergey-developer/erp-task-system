import {
  TaskJournalSourceEnum,
  TaskJournalTypeEnum,
} from 'modules/task/constants/enums'
import { BaseUserModel } from 'modules/user/models'
import { MaybeNull } from 'shared/interfaces/utils'

export type TaskJournalEntryModel = {
  id: number
  author: MaybeNull<Omit<BaseUserModel, 'avatar'>>
  createdAt: string
  updatedAt: string
  type: TaskJournalTypeEnum
  description: string
  sourceSystem: TaskJournalSourceEnum
  task: number
  recordId?: string
}

export type TaskJournalModel = Array<TaskJournalEntryModel>
