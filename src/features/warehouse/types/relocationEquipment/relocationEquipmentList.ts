import { AntdPaginatedList } from 'lib/antd/types'

import { RelocationEquipmentListItemModel } from 'features/warehouse/models'

export type GetRelocationEquipmentListTransformedSuccessResponse =
  AntdPaginatedList<RelocationEquipmentListItemModel>
