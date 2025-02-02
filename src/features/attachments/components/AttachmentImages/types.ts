import { AttachmentDetailDTO } from 'features/attachments/api/dto'

import { MaybeNull } from 'shared/types/utils'

export type AttachmentImage = Pick<AttachmentDetailDTO, 'id' | 'name' | 'url'> & {
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
