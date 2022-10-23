import { TaskCommentTypeEnum } from 'modules/task/constants/common'
import { CommentAuthorModel } from 'shared/models'

export type TaskCommentModel = {
  id: number
  createdAt: string
  type: TaskCommentTypeEnum
  text: string
  taskId: number
  author: CommentAuthorModel
}
