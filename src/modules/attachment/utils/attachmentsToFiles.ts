import { UploadFile } from 'antd/es/upload'

import { FileResponse } from 'shared/types/file'

import { AttachmentImage } from '../components/AttachmentImages/types'

export const attachmentsToFiles = (data: AttachmentImage[]): UploadFile<FileResponse>[] =>
  data.map((att) => ({
    uid: String(att.id),
    name: att.name,
    url: att.url,
    size: att.size,
    thumbUrl: att.thumbnails?.smallThumbnail || att.thumbnails?.mediumThumbnail,
    response: { id: att.id },
  }))
