import { InventorizationEquipmentListItemModel } from 'features/warehouse/models'

import { AntdPaginatedList } from 'lib/antd/types'

export type GetInventorizationEquipmentsTransformedResponse =
  AntdPaginatedList<InventorizationEquipmentListItemModel>
