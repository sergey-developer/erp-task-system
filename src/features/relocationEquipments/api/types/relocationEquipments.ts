import { RelocationEquipmentDTO } from 'features/relocationTasks/api/dto'

import { AntdPagination } from 'lib/antd/types'

export type GetRelocationEquipmentsTransformedResponse = AntdPagination<RelocationEquipmentDTO>
