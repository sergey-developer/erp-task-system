import { TaskCommentModel } from 'modules/task/models'
import { BaseTaskRequestArgs } from 'modules/task/types'

import { FileToSend } from 'shared/types/file'

export type CreateTaskCommentMutationArgs = BaseTaskRequestArgs & {
  comment: string
  attachments?: FileToSend[]
}

export type CreateTaskCommentSuccessResponse = TaskCommentModel
