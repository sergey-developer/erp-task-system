import { TaskAttachmentListModel } from 'features/task/models'
import { BaseUserModel } from 'features/user/models'

import { IdType } from 'shared/types/common'

export type TaskCommentModel = {
  id: IdType
  text: string
  author: Omit<BaseUserModel, 'avatar'>
  createdAt: string
  attachments: TaskAttachmentListModel
}
