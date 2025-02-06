import { AttachmentDetailDTO } from 'features/attachments/api/dto'
import { UserModel } from 'features/user/models'

export type InfrastructureOrderFormAttachmentDTO = Pick<
  AttachmentDetailDTO,
  'id' | 'name' | 'size' | 'url'
> & {
  createdAt: string
  createdBy: Pick<UserModel, 'id' | 'firstName' | 'lastName' | 'middleName'>
}
