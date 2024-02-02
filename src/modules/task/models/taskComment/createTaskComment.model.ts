import { TaskCommentModel } from 'modules/task/models'
import { TaskRequestArgs } from 'modules/task/types'

import { FileToSend } from 'shared/types/file'

export type CreateTaskCommentMutationArgs = TaskRequestArgs & {
  comment: string
  attachments?: FileToSend[]
}

export type CreateTaskCommentSuccessResponse = TaskCommentModel
