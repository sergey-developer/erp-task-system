import { TaskAttachmentListModel } from 'modules/task/models'

import { CommentAuthorModel } from 'shared/models'

export type TaskCommentModel = {
  id: number
  text: string
  author: CommentAuthorModel
  createdAt: string
  attachments: TaskAttachmentListModel
}
