import { TaskCommentModel } from 'modules/task/models'
import { BaseUserModel } from 'modules/user/models'

import { IdType } from 'shared/types/common'

export type TaskReclassificationRequestModel = {
  id: IdType
  createdAt: string
  comment: TaskCommentModel
  user: Pick<BaseUserModel, 'id' | 'firstName' | 'lastName' | 'middleName'>
}
