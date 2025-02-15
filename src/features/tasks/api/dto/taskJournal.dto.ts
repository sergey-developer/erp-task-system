import { TaskAttachmentsDTO } from 'features/tasks/api/dto'
import { BaseUserType } from 'features/users/api/types'

import { IdType } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'

import { TaskJournalSourceEnum, TaskJournalTypeEnum } from '../constants'

export type TaskJournalItemDTO = {
  id: IdType
  createdAt: string
  type: TaskJournalTypeEnum
  description: string
  sourceSystem: TaskJournalSourceEnum

  attachments: MaybeNull<TaskAttachmentsDTO>
  author: MaybeNull<Pick<BaseUserType, 'id' | 'firstName' | 'lastName' | 'middleName'>>
}

export type TaskJournalDTO = TaskJournalItemDTO[]
