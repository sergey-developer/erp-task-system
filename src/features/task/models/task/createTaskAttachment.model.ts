import { TaskAttachmentTypeEnum } from 'features/task/constants/task'
import { TaskRequestArgs } from 'features/task/types'

import { IdType } from 'shared/types/common'
import { UploadFileRequestArgs } from 'shared/types/file'

export type CreateTaskAttachmentRequest = TaskRequestArgs &
  UploadFileRequestArgs & {
    parentType: TaskAttachmentTypeEnum
  }

export type CreateTaskAttachmentResponse = { id: IdType }
