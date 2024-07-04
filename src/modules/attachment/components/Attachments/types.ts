import { AttachmentModel } from 'modules/attachment/models'

import { MaybeNull, NumberOrString } from 'shared/types/utils'

export type AttachmentListItem = Pick<AttachmentModel, 'name' | 'size' | 'url'> & {
  id: NumberOrString
  createdAt?: string
  firstName?: string
  lastName?: string
  middleName?: string
  externalId?: MaybeNull<string>
  remove?: () => void
}

export type AttachmentsProps = {
  data: AttachmentListItem[]
}
