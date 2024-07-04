import { AttachmentModel } from 'modules/attachment/models'

import { MaybeNull, NumberOrString } from 'shared/types/utils'

export type AttachmentListItem = Pick<AttachmentModel, 'name'> & {
  id: NumberOrString
  url?: AttachmentModel['url']
  size?: AttachmentModel['size']
  createdAt?: string
  firstName?: string
  lastName?: string
  middleName?: MaybeNull<string>
  externalId?: MaybeNull<string>
  remove?: () => void
}

export type AttachmentsProps = {
  data: AttachmentListItem[]
}
