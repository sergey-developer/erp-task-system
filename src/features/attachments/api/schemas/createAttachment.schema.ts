import { AttachmentTypeEnum } from 'features/attachments/api/constants'

import { IdType } from 'shared/types/common'
import { UploadFileRequestArgs } from 'shared/types/file'

export type CreateAttachmentRequest = UploadFileRequestArgs & {
  type: AttachmentTypeEnum
}

export type CreateAttachmentResponse = { id: IdType }
