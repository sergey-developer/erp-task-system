import { AttachmentModel } from 'features/attachment/models'

import { MaybeNull } from 'shared/types/utils'

export type RelocationTaskAttachmentListItemModel = Pick<
  AttachmentModel,
  'id' | 'name' | 'size' | 'url'
> & {
  thumbnails: MaybeNull<{
    mediumThumbnail: string
  }>
}

export type RelocationTaskAttachmentsModel = RelocationTaskAttachmentListItemModel[]
