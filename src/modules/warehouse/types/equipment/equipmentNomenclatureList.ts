import { AntdPaginatedList } from 'lib/antd/types'

import { EquipmentNomenclatureListItemModel } from 'modules/warehouse/models'

export type GetEquipmentNomenclatureListTransformedSuccessResponse =
  AntdPaginatedList<EquipmentNomenclatureListItemModel>
