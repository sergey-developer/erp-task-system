import { AttachmentTypeEnum } from 'modules/attachment/constants'

import { IdType } from 'shared/types/common'
import { FileToUpload } from 'shared/types/file'

export type CreateAttachmentMutationArgs = {
  type: AttachmentTypeEnum
  file: FileToUpload
}

export type CreateAttachmentSuccessResponse = { id: IdType }
