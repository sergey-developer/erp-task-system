import { TaskAttachmentListModel } from 'modules/task/models'

import { CommentAuthorModel } from 'shared/models/commentAuthor.model'
import { IdType } from 'shared/types/common'

export type TaskCommentModel = {
  id: IdType
  text: string
  author: CommentAuthorModel
  createdAt: string
  attachments: TaskAttachmentListModel
}
