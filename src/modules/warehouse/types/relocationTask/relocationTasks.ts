import { AntdPaginatedList } from 'lib/antd/types'

import { RelocationTaskListItemModel } from 'modules/warehouse/models'

export type GetRelocationTasksTransformedSuccessResponse =
  AntdPaginatedList<RelocationTaskListItemModel>
