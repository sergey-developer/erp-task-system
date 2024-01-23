import { IdType } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'

export type RelocationTaskAttachmentListItemModel = {
  id: IdType
  name: string
  size: number
  url: string
  thumbnail: MaybeNull<string>
}

export type RelocationTaskAttachmentsModel = RelocationTaskAttachmentListItemModel[]
