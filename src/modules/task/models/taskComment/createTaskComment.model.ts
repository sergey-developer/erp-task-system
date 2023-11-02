import { TaskCommentModel } from 'modules/task/models'
import { BaseTaskRequestArgs } from 'modules/task/types'

import { FileToUpload } from 'shared/types/file'

export type CreateTaskCommentMutationArgs = BaseTaskRequestArgs & {
  comment: string
  attachments?: FileToUpload[]
}

export type CreateTaskCommentSuccessResponse = TaskCommentModel
