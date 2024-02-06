import { IdType } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'

export type AttachmentListItem = {
  id: IdType
  name: string
  url: string
  size?: number
  thumbnails: MaybeNull<{
    smallThumbnail?: string
    mediumThumbnail: string
  }>
}

export type AttachmentListProps = {
  data: AttachmentListItem[]
  imgWidth?: number
  imgHeight?: number
}
