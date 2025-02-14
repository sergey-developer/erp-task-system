import { InventorizationListItemModel } from 'features/warehouse/models'

import { AntdPaginatedList } from 'lib/antd/types'

export type GetInventorizationsTransformedResponse = AntdPaginatedList<InventorizationListItemModel>
