import { UploadFile } from 'antd/es/upload'

import { FileResponse } from 'shared/types/file'

import { AttachmentListItem } from '../components/AttachmentList/types'

export const attachmentsToFiles = (data: AttachmentListItem[]): UploadFile<FileResponse>[] =>
  data.map((att) => ({
    uid: String(att.id),
    name: att.name,
    url: att.url,
    size: att.size,
    thumbUrl: att.thumbnails?.smallThumbnail || att.thumbnails?.mediumThumbnail,
    response: { id: att.id },
  }))
