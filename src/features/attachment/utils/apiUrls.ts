import { AttachmentApiEnum } from 'features/attachment/constants'

import { IdType } from 'shared/types/common'
import { generateApiPath } from 'shared/utils/api'

export const deleteAttachmentUrl = (id: IdType): string =>
  generateApiPath(AttachmentApiEnum.DeleteAttachment, { id: String(id) })
