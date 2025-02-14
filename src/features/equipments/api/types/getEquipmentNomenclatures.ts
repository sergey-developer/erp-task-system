import { EquipmentNomenclatureDTO } from 'features/warehouse/models'

import { AntdPaginatedList } from 'lib/antd/types'

export type GetEquipmentNomenclaturesTransformedResponse =
  AntdPaginatedList<EquipmentNomenclatureDTO>
