import { IdType } from 'shared/types/common'

export type AttachmentDTO = {
  id: IdType
  name: string
  url: string
  thumbnails: {
    smallThumbnail: string
    mediumThumbnail: string
  }
}

export type AttachmentsDTO = AttachmentDTO[]
