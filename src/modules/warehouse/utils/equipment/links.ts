import { generatePath } from 'react-router-dom'

import { WarehouseRouteEnum } from 'modules/warehouse/constants/routes'

import { IdType } from 'shared/types/common'

export const getEquipmentListPageLink = (id: IdType): string =>
  generatePath(WarehouseRouteEnum.EquipmentList, { id: String(id) })
