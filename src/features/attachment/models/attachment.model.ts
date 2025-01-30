import { IdType } from 'shared/types/common'

// todo: переиспользовать где возможно
export type AttachmentModel = {
  id: IdType
  name: string
  size: number
  url: string
}
