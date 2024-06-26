import { AntdPaginatedList } from 'lib/antd/types'

import { InventorizationEquipmentListItemModel } from 'modules/warehouse/models'

export type GetInventorizationEquipmentsTransformedSuccessResponse =
  AntdPaginatedList<InventorizationEquipmentListItemModel>
