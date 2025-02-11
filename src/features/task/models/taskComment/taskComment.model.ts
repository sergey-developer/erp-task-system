import { TaskAttachmentsModel } from 'features/task/models'
import { BaseUserType } from 'features/users/api/types'

import { IdType } from 'shared/types/common'

export type TaskCommentModel = {
  id: IdType
  text: string
  author: Omit<BaseUserType, 'avatar'>
  createdAt: string
  attachments: TaskAttachmentsModel
}
