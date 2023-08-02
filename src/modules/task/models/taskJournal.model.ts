import {
  TaskJournalSourceEnum,
  TaskJournalTypeEnum,
} from 'modules/task/constants'
import { BaseUserModel } from 'modules/user/models'

import { MaybeNull } from 'shared/types/utils'

import { TaskAttachmentListModel } from './taskAttachment.model'

export type TaskJournalEntryModel = {
  id: number
  author: MaybeNull<Omit<BaseUserModel, 'avatar'>>
  createdAt: string
  type: TaskJournalTypeEnum
  description: string
  sourceSystem: TaskJournalSourceEnum
  attachments: TaskAttachmentListModel
}

export type TaskJournalModel = Array<TaskJournalEntryModel>
