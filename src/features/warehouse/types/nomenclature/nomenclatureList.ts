import { AntdPaginatedList } from 'lib/antd/types'

import { NomenclatureListItemModel } from 'features/warehouse/models'

export type GetNomenclatureListTransformedSuccessResponse =
  AntdPaginatedList<NomenclatureListItemModel>
