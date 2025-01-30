import { AntdPaginatedList } from 'lib/antd/types'

import { InventorizationListItemModel } from 'features/warehouse/models'

export type GetInventorizationsTransformedSuccessResponse =
  AntdPaginatedList<InventorizationListItemModel>
