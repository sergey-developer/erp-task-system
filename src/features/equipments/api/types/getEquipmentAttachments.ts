import { AttachmentDTO } from 'features/attachments/api/dto'

import { AntdPagination } from 'lib/antd/types'

export type GetEquipmentAttachmentsTransformedResponse = AntdPagination<AttachmentDTO>
