import { WarehousesRoutesEnum } from 'features/warehouses/routes/routes'
import { generatePath } from 'react-router-dom'

import { IdType } from 'shared/types/common'
import { getPathWithQs } from 'shared/utils/url'

import { GetRelocationTasksRequest } from '../api/schemas'

type MakeRelocationTasksPageLinkParams = Partial<
  GetRelocationTasksRequest & {
    viewRelocationTask: IdType
  }
>

export const makeRelocationTasksPageLink = (params: MakeRelocationTasksPageLinkParams): string =>
  getPathWithQs<MakeRelocationTasksPageLinkParams>(WarehousesRoutesEnum.RelocationTasks, params)

export const makeEditRelocationTaskPageLink = (relocationTaskId: IdType): string =>
  generatePath(WarehousesRoutesEnum.EditRelocationTask, { id: String(relocationTaskId) })

export const makeEditRelocationTaskDraftPageLink = (relocationTaskId: IdType): string =>
  generatePath(WarehousesRoutesEnum.EditRelocationTaskDraft, {
    relocationTaskId: String(relocationTaskId),
  })
