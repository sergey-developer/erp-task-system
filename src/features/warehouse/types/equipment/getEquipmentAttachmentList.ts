import { AttachmentDTO } from 'features/attachments/api/dto'

import { AntdPaginatedList } from 'lib/antd/types'

export type GetEquipmentAttachmentListTransformedSuccessResponse = AntdPaginatedList<AttachmentDTO>
