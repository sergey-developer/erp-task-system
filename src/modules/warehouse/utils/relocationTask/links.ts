import { WarehouseRouteEnum } from 'modules/warehouse/constants/routes'

import { IdType } from 'shared/types/common'

export const getRelocationTaskListPageLink = (relocationTaskToOpen?: IdType): string =>
  relocationTaskToOpen
    ? `${WarehouseRouteEnum.RelocationTaskList}?relocationTask=${relocationTaskToOpen}`
    : WarehouseRouteEnum.RelocationTaskList
