import { AttachmentDetailDTO } from 'features/attachments/api/dto'
import { UserModel } from 'features/user/api/dto'

import { MaybeNull, NumberOrString } from 'shared/types/utils'

export type AttachmentListItem = Pick<AttachmentDetailDTO, 'name'> & {
  id: NumberOrString
  url?: AttachmentDetailDTO['url']
  size?: AttachmentDetailDTO['size']
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
