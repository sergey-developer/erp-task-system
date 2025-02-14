import { AttachmentDetailDTO } from 'features/attachments/api/dto'

import { MaybeNull } from 'shared/types/utils'

export type RelocationTaskAttachmentDTO = Pick<
  AttachmentDetailDTO,
  'id' | 'name' | 'size' | 'url'
> & {
  thumbnails: MaybeNull<{
    mediumThumbnail: string
  }>
}

export type RelocationTaskAttachmentsDTO = RelocationTaskAttachmentDTO[]
