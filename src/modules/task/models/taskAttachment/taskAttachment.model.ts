import { AttachmentModel } from 'modules/attachment/models'

import { MaybeNull } from 'shared/types/utils'

export type TaskAttachmentModel = Pick<AttachmentModel, 'id' | 'name' | 'size' | 'url'> & {
  externalId?: MaybeNull<string>
}
