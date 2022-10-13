import { BaseTaskReclassificationRequestModel } from 'modules/task/models'
import { BaseUserModel } from 'modules/user/models'

import { TaskDetailsReclassificationRequestCommentModel } from './taskDetailsReclassificationRequestComment.model'

export type TaskDetailsReclassificationRequestModel =
  BaseTaskReclassificationRequestModel & {
    comment: TaskDetailsReclassificationRequestCommentModel
    user: Omit<BaseUserModel, 'avatar'>
  }
