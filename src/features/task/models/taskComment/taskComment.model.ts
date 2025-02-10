import { TaskAttachmentsModel } from 'features/task/models'
import { BaseUserModel } from 'features/user/api/dto'

import { IdType } from 'shared/types/common'

export type TaskCommentModel = {
  id: IdType
  text: string
  author: Omit<BaseUserModel, 'avatar'>
  createdAt: string
  attachments: TaskAttachmentsModel
}
