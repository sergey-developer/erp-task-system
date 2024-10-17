import { AntdPaginatedList } from 'lib/antd/types'

import { InventorizationListItemModel } from 'modules/warehouse/models'

export type GetInventorizationsTransformedSuccessResponse =
  AntdPaginatedList<InventorizationListItemModel>
