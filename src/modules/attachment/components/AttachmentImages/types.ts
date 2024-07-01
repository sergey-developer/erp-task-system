import { AttachmentModel } from 'modules/attachment/models'

import { MaybeNull } from 'shared/types/utils'

export type AttachmentImage = Pick<AttachmentModel, 'id' | 'name' | 'url'> & {
  size?: number
  thumbnails: MaybeNull<{
    smallThumbnail?: string
    mediumThumbnail: string
  }>
}

export type AttachmentImagesProps = {
  data: AttachmentImage[]
  imgWidth?: number
  imgHeight?: number
}
