import { IdType } from 'shared/types/common'

export type AttachmentListItemModel = {
  id: IdType
  name: string
  url: string
  thumbnails: {
    smallThumbnail: string
    mediumThumbnail: string
  }
}

export type AttachmentListModel = AttachmentListItemModel[]
