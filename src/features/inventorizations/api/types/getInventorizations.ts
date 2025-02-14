import { AntdPagination } from 'lib/antd/types'

import { InventorizationDTO } from '../dto'

export type GetInventorizationsTransformedResponse = AntdPagination<InventorizationDTO>
