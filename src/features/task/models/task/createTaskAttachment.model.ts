import { TaskAttachmentTypeEnum } from 'features/task/constants/task'
import { RequestWithTask } from 'features/task/types'

import { IdType } from 'shared/types/common'
import { RequestWithFile } from 'shared/types/file'

export type CreateTaskAttachmentRequest = RequestWithTask &
  RequestWithFile & {
    parentType: TaskAttachmentTypeEnum
  }

export type CreateTaskAttachmentResponse = { id: IdType }
