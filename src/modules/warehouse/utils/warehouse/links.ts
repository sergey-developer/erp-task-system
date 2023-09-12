import { generatePath } from 'react-router-dom'

import { RouteEnum } from 'configs/routes'

import { IdType } from 'shared/types/common'

export const getWarehousePageLink = (id: IdType): string =>
  generatePath(RouteEnum.Warehouse, { id: String(id) })
