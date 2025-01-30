import { TaskCommentModel } from 'features/task/models'
import { TaskRequestArgs } from 'features/task/types'

import { FileToSend } from 'shared/types/file'

export type CreateTaskCommentMutationArgs = TaskRequestArgs & {
  comment: string
  attachments?: FileToSend[]
}

export type CreateTaskCommentSuccessResponse = TaskCommentModel
