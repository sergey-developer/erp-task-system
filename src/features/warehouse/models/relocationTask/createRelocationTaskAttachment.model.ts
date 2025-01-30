import { RelocationTaskRequestArgs } from 'features/warehouse/types'

import { IdType } from 'shared/types/common'
import { UploadFileRequestArgs } from 'shared/types/file'

export type CreateRelocationTaskAttachmentMutationArgs = RelocationTaskRequestArgs &
  UploadFileRequestArgs

export type CreateRelocationTaskAttachmentSuccessResponse = { id: IdType }
