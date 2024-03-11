import { AntdPaginatedList } from 'lib/antd/types'

import { RelocationEquipmentListItemModel } from 'modules/warehouse/models'

export type GetRelocationEquipmentListTransformedSuccessResponse =
  AntdPaginatedList<RelocationEquipmentListItemModel>
