import { OrderFormRequestArgs } from 'features/infrastructures/api/types'

import { IdType } from 'shared/types/common'
import { FileToSend } from 'shared/types/file'

export type CreateInfrastructureOrderFormAttachmentMutationArgs = OrderFormRequestArgs & {
  file: FileToSend
}

export type CreateInfrastructureOrderFormAttachmentSuccessResponse = { id: IdType }
