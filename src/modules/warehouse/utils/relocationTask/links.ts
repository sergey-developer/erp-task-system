import { generatePath } from 'react-router-dom'

import { WarehouseRouteEnum } from 'modules/warehouse/constants/routes'

import { IdType } from 'shared/types/common'

export const getRelocationTaskListPageLink = (viewRelocationTaskId?: IdType): string =>
  viewRelocationTaskId
    ? `${WarehouseRouteEnum.RelocationTasks}?viewRelocationTask=${viewRelocationTaskId}`
    : WarehouseRouteEnum.RelocationTasks

export const getEditRelocationTaskPageLink = (id: IdType): string =>
  generatePath(WarehouseRouteEnum.EditRelocationTask, { id: String(id) })
