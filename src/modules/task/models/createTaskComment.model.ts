import { BaseTaskRequestArgs } from '../interfaces'
import { TaskCommentModel } from './taskComment.model'

export type CreateTaskCommentMutationArgs = BaseTaskRequestArgs & {
  comment: string
}
export type CreateTaskCommentSuccessResponse = TaskCommentModel
