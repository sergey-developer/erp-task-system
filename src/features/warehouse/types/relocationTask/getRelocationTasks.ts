import { RelocationTaskListItemModel } from 'features/warehouse/models'

import { AntdPaginatedList } from 'lib/antd/types'

export type GetRelocationTasksTransformedResponse = AntdPaginatedList<RelocationTaskListItemModel>
