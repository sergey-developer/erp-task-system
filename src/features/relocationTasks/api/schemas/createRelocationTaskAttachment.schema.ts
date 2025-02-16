import { RequestWithRelocationTask } from 'features/relocationTasks/api/types'

import { IdType } from 'shared/types/common'
import { RequestWithFile } from 'shared/types/file'

export type CreateRelocationTaskAttachmentRequest = RequestWithRelocationTask & RequestWithFile
export type CreateRelocationTaskAttachmentResponse = { id: IdType }
