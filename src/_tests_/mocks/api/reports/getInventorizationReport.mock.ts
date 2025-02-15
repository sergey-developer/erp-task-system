import { GetInventorizationReportResponse } from 'features/reports/api/dto'
import { makeGetInventorizationReportEndpoint } from 'features/reports/helpers'
import { RequestWithInventorization } from 'features/warehouses/types'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getInventorizationReportMockFn = ({ inventorizationId }: RequestWithInventorization) =>
  getRequestMockFn(HttpMethodEnum.Get, makeGetInventorizationReportApiPath({ inventorizationId }))

export const mockGetInventorizationReportSuccess = (
  { inventorizationId }: RequestWithInventorization,
  options?: Partial<ResponseResolverOptions<GetInventorizationReportResponse>>,
) => getSuccessMockFn(getInventorizationReportMockFn({ inventorizationId }), options)()
