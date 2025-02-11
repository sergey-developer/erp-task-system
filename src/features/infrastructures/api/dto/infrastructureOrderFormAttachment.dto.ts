import { AttachmentDetailDTO } from 'features/attachments/api/dto'
import { UserDetailDTO } from 'features/users/api/dto'

export type InfrastructureOrderFormAttachmentDTO = Pick<
  AttachmentDetailDTO,
  'id' | 'name' | 'size' | 'url'
> & {
  createdAt: string
  createdBy: Pick<UserDetailDTO, 'id' | 'firstName' | 'lastName' | 'middleName'>
}
