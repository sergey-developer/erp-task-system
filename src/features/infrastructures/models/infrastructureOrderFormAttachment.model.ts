import { AttachmentModel } from 'features/attachment/models'
import { UserModel } from 'features/user/models'

export type InfrastructureOrderFormAttachmentModel = Pick<
  AttachmentModel,
  'id' | 'name' | 'size' | 'url'
> & {
  createdAt: string
  createdBy: Pick<UserModel, 'id' | 'firstName' | 'lastName' | 'middleName'>
}
