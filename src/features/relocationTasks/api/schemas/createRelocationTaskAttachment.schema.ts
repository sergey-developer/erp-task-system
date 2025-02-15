import { RequestWithRelocationTask } from 'features/warehouses/types'

import { IdType } from 'shared/types/common'
import { RequestWithFile } from 'shared/types/file'

export type CreateRelocationTaskAttachmentRequest = RequestWithRelocationTask & RequestWithFile
export type CreateRelocationTaskAttachmentResponse = { id: IdType }
