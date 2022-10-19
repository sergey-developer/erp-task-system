import { BaseTaskRequestArgs } from 'modules/task/interfaces'

import { TaskDetailsCommentModel } from './taskDetailsComment.model'

export type CreateTaskCommentMutationArgsModel = BaseTaskRequestArgs & {
  comment: string
}

export type CreateTaskCommentResponseModel = TaskDetailsCommentModel
