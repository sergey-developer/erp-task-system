import { BaseTaskCommentModel } from 'modules/task/models'
import { CommentAuthorModel } from 'shared/interfaces/models'

export type TaskDetailsCommentModel = BaseTaskCommentModel & {
  author: CommentAuthorModel
  taskId: number
  attachments: Array<string>
}
