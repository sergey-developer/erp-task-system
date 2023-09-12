import { AntdPaginatedList } from 'lib/antd/types'

import { NomenclatureListItemModel } from 'modules/warehouse/models'

export type GetNomenclatureListTransformedSuccessResponse =
  AntdPaginatedList<NomenclatureListItemModel>
