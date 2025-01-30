import { AntdPaginatedList } from 'lib/antd/types'

import { RelocationTaskListItemModel } from 'features/warehouse/models'

export type GetRelocationTasksTransformedSuccessResponse =
  AntdPaginatedList<RelocationTaskListItemModel>
