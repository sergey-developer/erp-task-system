import { TaskJournalSourceEnum, TaskJournalTypeEnum } from 'modules/task/constants'
import { TaskAttachmentListModel } from 'modules/task/models'
import { BaseUserModel } from 'modules/user/models'

import { IdType } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'

export type TaskJournalEntryModel = {
  id: IdType
  createdAt: string
  type: TaskJournalTypeEnum
  description: string
  sourceSystem: TaskJournalSourceEnum
  attachments: TaskAttachmentListModel

  author: MaybeNull<Pick<BaseUserModel, 'id' | 'firstName' | 'lastName' | 'middleName'>>
}

export type TaskJournalModel = TaskJournalEntryModel[]
