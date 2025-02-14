import { RelocationEquipmentListItemModel } from 'features/warehouse/models'

import { AntdPagination } from 'lib/antd/types'

export type GetRelocationEquipmentListTransformedResponse =
  AntdPagination<RelocationEquipmentListItemModel>
