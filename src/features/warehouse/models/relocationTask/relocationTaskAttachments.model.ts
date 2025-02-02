import { AttachmentDetailDTO } from 'features/attachments/api/dto'

import { MaybeNull } from 'shared/types/utils'

export type RelocationTaskAttachmentListItemModel = Pick<
  AttachmentDetailDTO,
  'id' | 'name' | 'size' | 'url'
> & {
  thumbnails: MaybeNull<{
    mediumThumbnail: string
  }>
}

export type RelocationTaskAttachmentsModel = RelocationTaskAttachmentListItemModel[]
