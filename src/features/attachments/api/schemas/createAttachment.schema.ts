import { AttachmentTypeEnum } from 'features/attachments/api/constants'

import { IdType } from 'shared/types/common'
import { RequestWithFile } from 'shared/types/file'

export type CreateAttachmentRequest = RequestWithFile & {
  type: AttachmentTypeEnum
}

export type CreateAttachmentResponse = { id: IdType }
