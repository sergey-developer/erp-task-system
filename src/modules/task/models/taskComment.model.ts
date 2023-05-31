import { CommentAuthorModel } from 'shared/models'

import { TaskAttachmentListModel } from './taskAttachment.model'

export type TaskCommentModel = {
  id: number
  text: string
  author: CommentAuthorModel
  createdAt: string
  attachments: TaskAttachmentListModel
}
