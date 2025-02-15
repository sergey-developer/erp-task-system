import { TaskAttachmentsDTO } from 'features/tasks/api/dto'
import { BaseUserType } from 'features/users/api/types'

import { IdType } from 'shared/types/common'

export type TaskCommentDTO = {
  id: IdType
  text: string
  author: Omit<BaseUserType, 'avatar'>
  createdAt: string
  attachments: TaskAttachmentsDTO
}
