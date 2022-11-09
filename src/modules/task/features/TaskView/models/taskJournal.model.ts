import {
  TaskJournalSourceEnum,
  TaskJournalTypeEnum,
} from 'modules/task/constants/common'
import { UserModel } from 'modules/user/models'
import { MaybeNull } from 'shared/interfaces/utils'

export type TaskJournalEntryModel = {
  id: number
  author: MaybeNull<Omit<UserModel, 'avatar'>>
  createdAt: string
  type: TaskJournalTypeEnum
  description: string
  sourceSystem: TaskJournalSourceEnum
}

export type TaskJournalModel = Array<TaskJournalEntryModel>
