import { TaskCommentDTO } from 'features/tasks/api/dto'
import { RequestWithTask } from 'features/tasks/api/types'

import { FileToSend } from 'shared/types/file'

export type CreateTaskCommentRequest = RequestWithTask & {
  comment: string
  attachments?: FileToSend[]
}

export type CreateTaskCommentResponse = TaskCommentDTO
