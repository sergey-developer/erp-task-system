import { RequestWithInventorization } from 'features/inventorizations/api/types'
import { makeGetInventorizationReportApiPath } from 'features/reports/api/helpers'
import { GetInventorizationReportResponse } from 'features/reports/api/schemas'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/api/request'
import { ResponseResolverOptions } from '_tests_/mocks/api/response'

const getInventorizationReportMockFn = ({ inventorizationId }: RequestWithInventorization) =>
  getRequestMockFn(HttpMethodEnum.Get, makeGetInventorizationReportApiPath({ inventorizationId }))

export const mockGetInventorizationReportSuccess = (
  { inventorizationId }: RequestWithInventorization,
  options?: Partial<ResponseResolverOptions<GetInventorizationReportResponse>>,
) => getSuccessMockFn(getInventorizationReportMockFn({ inventorizationId }), options)()
