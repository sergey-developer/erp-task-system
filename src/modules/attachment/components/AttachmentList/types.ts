import { IdType } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'

export type AttachmentListItem = {
  id: IdType
  name: string
  url: string
  thumbnails: MaybeNull<{
    mediumThumbnail: string
  }>
}

export type AttachmentListProps = {
  data: AttachmentListItem[]
  imgWidth?: number
  imgHeight?: number
}
