import { AntdPagination } from 'lib/antd/types'

import { InventorizationEquipmentDTO } from '../dto'

export type GetInventorizationEquipmentsTransformedResponse =
  AntdPagination<InventorizationEquipmentDTO>
