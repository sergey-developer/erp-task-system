import { AttachmentDetailDTO } from 'features/attachments/api/dto'

import { MaybeNull } from 'shared/types/utils'

export type TaskAttachmentModel = Pick<AttachmentDetailDTO, 'id' | 'name' | 'size' | 'url'> & {
  externalId?: MaybeNull<string>
}
