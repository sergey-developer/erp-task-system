import { TaskCommentModel } from 'features/task/models'
import { RequestWithTask } from 'features/task/types'

import { FileToSend } from 'shared/types/file'

export type CreateTaskCommentRequest = RequestWithTask & {
  comment: string
  attachments?: FileToSend[]
}

export type CreateTaskCommentResponse = TaskCommentModel
