import { AntdPaginatedList } from 'lib/antd/types'

import { EquipmentListItemModel } from 'features/warehouse/models'

export type GetEquipmentListTransformedSuccessResponse =
  AntdPaginatedList<EquipmentListItemModel>
