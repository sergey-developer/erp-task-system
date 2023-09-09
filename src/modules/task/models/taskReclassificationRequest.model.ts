import { BaseUserModel } from 'modules/user/models'

import { IdType } from 'shared/types/common'

import { TaskCommentModel } from './taskComment.model'

export type TaskReclassificationRequestModel = {
  id: IdType
  createdAt: string
  comment: TaskCommentModel
  user: Omit<BaseUserModel, 'avatar'>
}
