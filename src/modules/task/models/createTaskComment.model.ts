import { RcFile } from 'antd/es/upload'

import { BaseTaskRequestArgs } from '../types'
import { TaskCommentModel } from './taskComment.model'

export type CreateTaskCommentMutationArgs = BaseTaskRequestArgs & {
  comment: string
  attachments?: Array<RcFile>
}

export type CreateTaskCommentSuccessResponse = TaskCommentModel
