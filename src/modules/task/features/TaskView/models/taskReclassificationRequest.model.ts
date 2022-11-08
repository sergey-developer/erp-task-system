import { BaseUserModel } from 'modules/user/models'

import { TaskCommentModel } from './taskComment.model'

export type TaskReclassificationRequestModel = {
  id: number
  createdAt: string
  comment: TaskCommentModel
  user: BaseUserModel
}
