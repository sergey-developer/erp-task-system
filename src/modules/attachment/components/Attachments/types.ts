import { AttachmentModel } from 'modules/attachment/models'
import { UserModel } from 'modules/user/models'

import { MaybeNull, NumberOrString } from 'shared/types/utils'

export type AttachmentListItem = Pick<AttachmentModel, 'name' | 'size' | 'url'> & {
  id: NumberOrString
  createdAt?: string
  createdBy?: Pick<UserModel, 'firstName' | 'lastName' | 'middleName'>
  firstName?: string
  lastName?: string
  middleName?: string
  externalId?: MaybeNull<string>
  remove?: () => void
}

export type AttachmentsProps = {
  data: AttachmentListItem[]
}
