import { BaseTaskCommentModel, TaskAttachmentModel } from 'modules/task/models'
import { CommentAuthorModel } from 'shared/models'

export type TaskDetailsReclassificationRequestCommentModel =
  BaseTaskCommentModel & {
    taskId: number
    author: CommentAuthorModel
    attachments: Array<TaskAttachmentModel>
  }
