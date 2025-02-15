import { TaskAttachmentTypeEnum } from 'features/tasks/api/constants'
import { RequestWithTask } from 'features/tasks/api/types'

import { IdType } from 'shared/types/common'
import { RequestWithFile } from 'shared/types/file'

export type CreateTaskAttachmentRequest = RequestWithTask &
  RequestWithFile & {
    parentType: TaskAttachmentTypeEnum
  }

export type CreateTaskAttachmentResponse = { id: IdType }
