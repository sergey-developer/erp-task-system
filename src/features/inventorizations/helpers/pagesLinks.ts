import { ExecuteInventorizationPageTabsEnum } from 'features/inventorizations/pages/ExecuteInventorizationPage/constants'
import { WarehousesRoutesEnum } from 'features/warehouses/routes/routes'
import { generatePath } from 'react-router-dom'

import { IdType } from 'shared/types/common'
import { getPathWithQs } from 'shared/utils/url'

import { GetInventorizationsRequest } from '../api/schemas'
import { RequestWithInventorization } from '../api/types'

type MakeInventorizationsPageLinkParams = Partial<
  GetInventorizationsRequest & Pick<RequestWithInventorization, 'inventorizationId'>
>

export const makeInventorizationsPageLink = (params: MakeInventorizationsPageLinkParams): string =>
  getPathWithQs<MakeInventorizationsPageLinkParams>(WarehousesRoutesEnum.Inventorizations, params)

export type MakeExecuteInventorizationPageLinkParams = Pick<
  RequestWithInventorization,
  'inventorizationId'
> &
  Partial<{
    tab: ExecuteInventorizationPageTabsEnum
    relocationTaskDraftId: IdType
  }>

export const makeExecuteInventorizationPageLink = ({
  inventorizationId,
  ...params
}: MakeExecuteInventorizationPageLinkParams): string =>
  getPathWithQs<Omit<MakeExecuteInventorizationPageLinkParams, 'inventorizationId'>>(
    generatePath(WarehousesRoutesEnum.ExecuteInventorization, {
      inventorizationId: String(inventorizationId),
    }),
    params,
  )
