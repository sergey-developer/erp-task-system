import { BaseUserModel } from 'modules/user/models'

import { TaskCommentModel } from './taskComment.model'

export type TaskDetailsReclassificationRequestModel = {
  id: number
  createdAt: string
  comment: TaskCommentModel
  user: Omit<BaseUserModel, 'avatar'>
}
