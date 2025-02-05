import { TaskJournalSourceEnum, TaskJournalTypeEnum } from 'features/task/constants/taskJournal'
import { TaskAttachmentsModel } from 'features/task/models'
import { BaseUserModel } from 'features/user/models'

import { IdType } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'

export type TaskJournalEntryModel = {
  id: IdType
  createdAt: string
  type: TaskJournalTypeEnum
  description: string
  sourceSystem: TaskJournalSourceEnum

  attachments: MaybeNull<TaskAttachmentsModel>
  author: MaybeNull<Pick<BaseUserModel, 'id' | 'firstName' | 'lastName' | 'middleName'>>
}

export type TaskJournalModel = TaskJournalEntryModel[]
