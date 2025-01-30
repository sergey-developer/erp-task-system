import { generatePath } from 'react-router-dom'

import { WarehouseRouteEnum } from 'features/warehouse/constants/routes'
import { GetRelocationTasksQueryArgs } from 'features/warehouse/models'

import { IdType } from 'shared/types/common'
import { getPathWithQs } from 'shared/utils/url'

type MakeRelocationTasksPageLinkParams = Partial<
  GetRelocationTasksQueryArgs & {
    viewRelocationTask: IdType
  }
>

export const makeRelocationTasksPageLink = (params: MakeRelocationTasksPageLinkParams): string =>
  getPathWithQs<MakeRelocationTasksPageLinkParams>(WarehouseRouteEnum.RelocationTasks, params)

export const makeEditRelocationTaskPageLink = (relocationTaskId: IdType): string =>
  generatePath(WarehouseRouteEnum.EditRelocationTask, { id: String(relocationTaskId) })

export const makeEditRelocationTaskDraftPageLink = (relocationTaskId: IdType): string =>
  generatePath(WarehouseRouteEnum.EditRelocationTaskDraft, {
    relocationTaskId: String(relocationTaskId),
  })
