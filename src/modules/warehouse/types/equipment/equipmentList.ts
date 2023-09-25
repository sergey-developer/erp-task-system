import { AntdPaginatedList } from 'lib/antd/types'

import { EquipmentListItemModel } from 'modules/warehouse/models'

export type GetEquipmentListTransformedSuccessResponse =
  AntdPaginatedList<EquipmentListItemModel>
