import { AttachmentTypeEnum } from 'modules/attachment/constants'

import { IdType } from 'shared/types/common'
import { FileToSend } from 'shared/types/file'

export type CreateAttachmentMutationArgs = {
  type: AttachmentTypeEnum
  file: FileToSend
}

export type CreateAttachmentSuccessResponse = { id: IdType }
