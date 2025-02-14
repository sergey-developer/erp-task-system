import { RelocationEquipmentListItemModel } from 'features/warehouse/models'

import { AntdPaginatedList } from 'lib/antd/types'

export type GetRelocationEquipmentListTransformedResponse =
  AntdPaginatedList<RelocationEquipmentListItemModel>
