import { RcFile } from 'antd/es/upload'

import { TaskCommentModel } from 'modules/task/models'
import { BaseTaskRequestArgs } from 'modules/task/types'

export type CreateTaskCommentMutationArgs = BaseTaskRequestArgs & {
  comment: string
  attachments?: RcFile[]
}

export type CreateTaskCommentSuccessResponse = TaskCommentModel
