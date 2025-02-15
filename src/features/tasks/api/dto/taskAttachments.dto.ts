import { AttachmentDetailDTO } from 'features/attachments/api/dto'

import { MaybeNull } from 'shared/types/utils'

export type TaskAttachmentDTO = Pick<AttachmentDetailDTO, 'id' | 'name' | 'size' | 'url'> & {
  externalId?: MaybeNull<string>
}

export type TaskAttachmentsDTO = TaskAttachmentDTO[]
