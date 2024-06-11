import { AttachmentModel } from 'modules/attachment/models'

export type RelocationTaskAttachmentModel = Pick<
  AttachmentModel,
  'id' | 'name' | 'size' | 'url'
> & {
  createdAt: string
  firstName: string
  lastName: string
  middleName: string
}
