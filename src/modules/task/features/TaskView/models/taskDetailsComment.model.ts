import { BaseTaskCommentModel } from 'modules/task/models'
import { CommentAuthorModel } from 'shared/models'

export type TaskDetailsCommentModel = BaseTaskCommentModel & {
  author: CommentAuthorModel
  taskId: number
  attachments: Array<string>
}
