import { TaskAttachmentTypeEnum } from 'modules/task/constants/task'
import { TaskRequestArgs } from 'modules/task/types'

import { IdType } from 'shared/types/common'
import { UploadFileRequestArgs } from 'shared/types/file'

export type CreateTaskAttachmentMutationArgs = TaskRequestArgs &
  UploadFileRequestArgs & {
    parentType: TaskAttachmentTypeEnum
  }

export type CreateTaskAttachmentSuccessResponse = { id: IdType }
