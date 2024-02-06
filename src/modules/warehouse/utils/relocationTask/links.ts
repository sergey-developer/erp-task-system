import qs from 'qs'
import { generatePath } from 'react-router-dom'

import { WarehouseRouteEnum } from 'modules/warehouse/constants/routes'
import { GetRelocationTaskListQueryArgs } from 'modules/warehouse/models'

import { IdType } from 'shared/types/common'

type GetRelocationTasksPageLink = Partial<
  GetRelocationTaskListQueryArgs & {
    viewRelocationTask: IdType
  }
>

export const getRelocationTasksPageLink = (params: GetRelocationTasksPageLink): string =>
  `${WarehouseRouteEnum.RelocationTaskList}?${qs.stringify(params)}`

export const getEditRelocationTaskPageLink = (id: IdType): string =>
  generatePath(WarehouseRouteEnum.EditRelocationTask, { id: String(id) })
