import { AntdPaginatedList } from 'lib/antd/types'

import { AttachmentListItemModel } from 'features/attachment/models'

export type GetEquipmentAttachmentListTransformedSuccessResponse =
  AntdPaginatedList<AttachmentListItemModel>
