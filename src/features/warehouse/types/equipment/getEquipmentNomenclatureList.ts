import { AntdPaginatedList } from 'lib/antd/types'

import { EquipmentNomenclatureListItemModel } from 'features/warehouse/models'

export type GetEquipmentNomenclaturesTransformedSuccessResponse =
  AntdPaginatedList<EquipmentNomenclatureListItemModel>
