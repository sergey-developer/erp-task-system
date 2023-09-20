import { AntdPaginatedList } from 'lib/antd/types'

import { RelocationTaskListItemModel } from 'modules/warehouse/models'

export type GetRelocationTaskListTransformedSuccessResponse =
  AntdPaginatedList<RelocationTaskListItemModel>
