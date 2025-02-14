import { AttachmentsApiPathsEnum } from 'features/attachments/api/constants'

import { IdType } from 'shared/types/common'
import { generateApiPath } from 'shared/utils/api'

export const makeDeleteAttachmentApiPath = (id: IdType): string =>
  generateApiPath(AttachmentsApiPathsEnum.DeleteAttachment, { id: String(id) })
