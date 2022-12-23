import { BaseTaskRequestArgs } from '../interfaces'
import { TaskCommentModel } from './taskComment.model'

export type CreateTaskCommentMutationArgsModel = BaseTaskRequestArgs & {
  comment: string
}
export type CreateTaskCommentResponseModel = TaskCommentModel
