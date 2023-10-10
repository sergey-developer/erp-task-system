import { generatePath } from 'react-router-dom'

import { WarehouseRouteEnum } from 'modules/warehouse/constants/routes'

import { IdType } from 'shared/types/common'

export const getRelocationTaskListPageLink = (relocationTaskId: IdType): string =>
  `${WarehouseRouteEnum.RelocationTaskList}?relocationTask=${relocationTaskId}`

export const getEditRelocationTaskPageLink = (relocationTaskId: IdType): string =>
  generatePath(WarehouseRouteEnum.EditRelocationTask, { id: String(relocationTaskId) })
