import { UploadFile } from 'antd/es/upload'

import { RelocationEquipmentAttachmentListModel } from 'modules/warehouse/models/relocationEquipment'

import { FileResponse } from 'shared/types/file'

export const relocationEquipmentAttachmentListToFileList = (
  data: RelocationEquipmentAttachmentListModel,
): UploadFile<FileResponse>[] =>
  data.map((att) => ({
    uid: String(att.id),
    name: att.name,
    url: att.url,
    thumbUrl: att.thumbnails.smallThumbnail,
    response: { id: att.id },
  }))
