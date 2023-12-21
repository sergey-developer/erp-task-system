import { AntdPaginatedList } from 'lib/antd/types'

import { AttachmentListItemModel } from 'modules/attachment/models'

export type GetEquipmentAttachmentListTransformedSuccessResponse =
  AntdPaginatedList<AttachmentListItemModel>
