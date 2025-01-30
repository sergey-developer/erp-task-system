import { generatePath } from 'react-router-dom'

import { WarehouseRouteEnum } from 'features/warehouse/constants/routes'
import { GetInventorizationsQueryArgs } from 'features/warehouse/models'
import { ExecuteInventorizationPageTabsEnum } from 'features/warehouse/pages/ExecuteInventorizationPage/constants'
import { InventorizationRequestArgs } from 'features/warehouse/types'

import { IdType } from 'shared/types/common'
import { getPathWithQs } from 'shared/utils/url'

type GetInventorizationsPageLinkParams = Partial<
  GetInventorizationsQueryArgs & Pick<InventorizationRequestArgs, 'inventorizationId'>
>

export const getInventorizationsPageLink = (params: GetInventorizationsPageLinkParams): string =>
  getPathWithQs<GetInventorizationsPageLinkParams>(WarehouseRouteEnum.Inventorizations, params)

export type GetExecuteInventorizationPageLinkParams = Pick<
  InventorizationRequestArgs,
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
