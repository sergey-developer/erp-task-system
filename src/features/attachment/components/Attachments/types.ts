import { AttachmentModel } from 'features/attachment/models'
import { UserModel } from 'features/user/models'

import { MaybeNull, NumberOrString } from 'shared/types/utils'

export type AttachmentListItem = Pick<AttachmentModel, 'name'> & {
  id: NumberOrString
  url?: AttachmentModel['url']
  size?: AttachmentModel['size']
  createdAt?: string
  createdBy?: Pick<UserModel, 'firstName' | 'lastName' | 'middleName'>
  firstName?: string
  lastName?: string
  middleName?: MaybeNull<string>
  externalId?: MaybeNull<string>
  remove?: () => void
}

export type AttachmentsProps = {
  data: AttachmentListItem[]
  showAboutInPopover?: boolean
}
