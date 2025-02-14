import { EquipmentDTO } from 'features/warehouse/models'

import { AntdPaginatedList } from 'lib/antd/types'

export type GetEquipmentListTransformedResponse = AntdPaginatedList<EquipmentDTO>
