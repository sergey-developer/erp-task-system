import { BaseUserModel } from 'modules/user/models'
import { MaybeNull } from 'shared/interfaces/utils'

export type TaskJournalItemModel = {
  id: number
  createdAt: string
  description: string
  type: string
  sourceSystem: string
  author: MaybeNull<Omit<BaseUserModel, 'avatar'>>
}

export type TaskJournalModel = Array<TaskJournalItemModel>
