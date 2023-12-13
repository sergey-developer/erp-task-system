import { BaseRelocationTaskRequestArgs } from 'modules/warehouse/types'

import { IdType } from 'shared/types/common'
import { FileToSend } from 'shared/types/file'

export type CreateRelocationTaskAttachmentMutationArgs = BaseRelocationTaskRequestArgs & {
  file: FileToSend
}

export type CreateRelocationTaskAttachmentSuccessResponse = { id: IdType }
