import { IdType } from 'shared/types/common'

// todo: переиспользовать где возможно
export type AttachmentDetailDTO = {
  id: IdType
  name: string
  size: number
  url: string
}
