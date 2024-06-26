import { generatePath } from 'react-router-dom'

import { WarehouseRouteEnum } from 'modules/warehouse/constants/routes'
import { GetRelocationTasksQueryArgs } from 'modules/warehouse/models'

import { IdType } from 'shared/types/common'
import { getPathWithQs } from 'shared/utils/url'

type GetRelocationTasksPageLinkParams = Partial<
  GetRelocationTasksQueryArgs & {
    viewRelocationTask: IdType
  }
>

export const getRelocationTasksPageLink = (params: GetRelocationTasksPageLinkParams): string =>
  getPathWithQs<GetRelocationTasksPageLinkParams>(WarehouseRouteEnum.RelocationTasks, params)

export const getEditRelocationTaskPageLink = (id: IdType): string =>
  generatePath(WarehouseRouteEnum.EditRelocationTask, { id: String(id) })
