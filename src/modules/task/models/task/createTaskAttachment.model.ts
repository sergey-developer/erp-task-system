import { TaskAttachmentTypeEnum } from 'modules/task/constants/task'
import { TaskRequestArgs } from 'modules/task/types'

import { IdType } from 'shared/types/common'
import { FileToSend } from 'shared/types/file'

export type CreateTaskAttachmentMutationArgs = TaskRequestArgs & {
  file: FileToSend
  parentType: TaskAttachmentTypeEnum
}

export type CreateTaskAttachmentSuccessResponse = { id: IdType }
