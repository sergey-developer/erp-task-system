import { AttachmentDetailDTO } from 'features/attachments/api/dto'

export type RelocationTaskAttachmentDetailDTO = Pick<
  AttachmentDetailDTO,
  'id' | 'name' | 'size' | 'url'
> & {
  createdAt: string
  firstName: string
  lastName: string
  middleName: string
}
