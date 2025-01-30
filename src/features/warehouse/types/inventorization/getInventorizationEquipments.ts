import { AntdPaginatedList } from 'lib/antd/types'

import { InventorizationEquipmentListItemModel } from 'features/warehouse/models'

export type GetInventorizationEquipmentsTransformedSuccessResponse =
  AntdPaginatedList<InventorizationEquipmentListItemModel>
