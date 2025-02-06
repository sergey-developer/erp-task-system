import { AttachmentsEndpointsEnum } from 'features/attachments/api/constants'

import { IdType } from 'shared/types/common'
import { generateApiPath } from 'shared/utils/api'

export const makeDeleteAttachmentEndpoint = (id: IdType): string =>
  generateApiPath(AttachmentsEndpointsEnum.DeleteAttachment, { id: String(id) })
