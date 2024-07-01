import { AttachmentModel } from './attachment.model'

export type AttachmentListItemModel = Pick<AttachmentModel, 'id' | 'name' | 'url'> & {
  thumbnails: {
    smallThumbnail: string
    mediumThumbnail: string
  }
}

export type AttachmentListModel = AttachmentListItemModel[]
