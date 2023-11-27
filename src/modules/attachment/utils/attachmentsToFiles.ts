import { UploadFile } from 'antd/es/upload'

import { AttachmentListModel } from 'modules/attachment/models'

import { FileResponse } from 'shared/types/file'

export const attachmentsToFiles = (data: AttachmentListModel): UploadFile<FileResponse>[] =>
  data.map((att) => ({
    uid: String(att.id),
    name: att.name,
    url: att.url,
    thumbUrl: att.thumbnails.smallThumbnail,
    response: { id: att.id },
  }))
