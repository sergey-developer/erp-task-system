import { ExecuteInventorizationPageTabsEnum } from 'features/inventorizations/pages/ExecuteInventorizationPage/constants'
import { WarehouseRouteEnum } from 'features/warehouse/constants/routes'
import { GetInventorizationsRequest } from 'features/warehouse/models'
import { RequestWithInventorization } from 'features/warehouse/types'
import { generatePath } from 'react-router-dom'

import { IdType } from 'shared/types/common'
import { getPathWithQs } from 'shared/utils/url'

type GetInventorizationsPageLinkParams = Partial<
  GetInventorizationsRequest & Pick<RequestWithInventorization, 'inventorizationId'>
>

export const getInventorizationsPageLink = (params: GetInventorizationsPageLinkParams): string =>
  getPathWithQs<GetInventorizationsPageLinkParams>(WarehouseRouteEnum.Inventorizations, params)

export type GetExecuteInventorizationPageLinkParams = Pick<
  RequestWithInventorization,
  'inventorizationId'
> &
  Partial<{
    tab: ExecuteInventorizationPageTabsEnum
    relocationTaskDraftId: IdType
  }>

export const getExecuteInventorizationPageLink = ({
  inventorizationId,
  ...params
}: GetExecuteInventorizationPageLinkParams): string =>
  getPathWithQs<Omit<GetExecuteInventorizationPageLinkParams, 'inventorizationId'>>(
    generatePath(WarehouseRouteEnum.ExecuteInventorization, {
      inventorizationId: String(inventorizationId),
    }),
    params,
  )
