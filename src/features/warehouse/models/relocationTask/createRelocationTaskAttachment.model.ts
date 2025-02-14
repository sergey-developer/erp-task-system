import { RelocationTaskRequestArgs } from 'features/warehouse/types'

import { IdType } from 'shared/types/common'
import { UploadFileRequestArgs } from 'shared/types/file'

export type CreateRelocationTaskAttachmentRequest = RelocationTaskRequestArgs &
  UploadFileRequestArgs

export type CreateRelocationTaskAttachmentResponse = { id: IdType }
