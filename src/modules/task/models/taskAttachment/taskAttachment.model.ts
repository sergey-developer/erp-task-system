import { IdType } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'

export type TaskAttachmentModel = {
  id: IdType
  name: string
  size: number
  url: string
  externalId?: MaybeNull<string>
}
