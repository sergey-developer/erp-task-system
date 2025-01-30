import { AttachmentTypeEnum } from 'features/attachment/constants'

import { IdType } from 'shared/types/common'
import { UploadFileRequestArgs } from 'shared/types/file'

export type CreateAttachmentMutationArgs = UploadFileRequestArgs & {
  type: AttachmentTypeEnum
}

export type CreateAttachmentSuccessResponse = { id: IdType }
