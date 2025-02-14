import { RelocationTaskListItemModel } from 'features/warehouse/models'

import { AntdPagination } from 'lib/antd/types'

export type GetRelocationTasksTransformedResponse = AntdPagination<RelocationTaskListItemModel>
