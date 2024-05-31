import { generatePath } from 'react-router-dom'

import { WarehouseRouteEnum } from 'modules/warehouse/constants/routes'
import { GetInventorizationsQueryArgs } from 'modules/warehouse/models'
import { InventorizationRequestArgs } from 'modules/warehouse/types'

import { IdType } from 'shared/types/common'
import { getPathWithQs } from 'shared/utils/url'

type GetInventorizationsPageLinkParams = Partial<
  GetInventorizationsQueryArgs & Pick<InventorizationRequestArgs, 'inventorizationId'>
>

export const getInventorizationsPageLink = (params: GetInventorizationsPageLinkParams): string =>
  getPathWithQs<GetInventorizationsPageLinkParams>(WarehouseRouteEnum.Inventorizations, params)

export const getExecuteInventorizationPageLink = (inventorizationId: IdType): string =>
  generatePath(WarehouseRouteEnum.ExecuteInventorization, { id: String(inventorizationId) })
