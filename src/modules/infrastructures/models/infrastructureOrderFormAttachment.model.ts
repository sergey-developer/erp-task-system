import { AttachmentModel } from 'modules/attachment/models'
import { UserModel } from 'modules/user/models'

export type InfrastructureOrderFormAttachmentModel = Pick<
  AttachmentModel,
  'id' | 'name' | 'size' | 'url'
> & {
  createdAt: string
  createdBy: Pick<UserModel, 'id' | 'firstName' | 'lastName' | 'middleName'>
}
