import { UploadFile } from 'antd/es/upload'

import { AttachmentModel } from 'features/attachment/models'
import { UserModel } from 'features/user/models'

import { FileResponse } from 'shared/types/file'
import { MaybeNull } from 'shared/types/utils'

type Attachment = Pick<AttachmentModel, 'id' | 'name' | 'url'> & {
  size?: number
  thumbnails?: MaybeNull<{
    smallThumbnail?: string
    mediumThumbnail: string
  }>
  createdBy?: Pick<UserModel, 'firstName' | 'lastName' | 'middleName'>
  createdAt?: string
}

export const attachmentsToFiles = (attachments: Attachment[]): UploadFile<FileResponse>[] =>
  attachments.map((att) => ({
    uid: String(att.id),
    name: att.name,
    url: att.url,
    size: att.size,
    thumbUrl: att.thumbnails?.smallThumbnail || att.thumbnails?.mediumThumbnail,
    response: { id: att.id, createdBy: att.createdBy, createdAt: att.createdAt },
  }))
