import { GetInventorizationReportSuccessResponse } from 'features/reports/api/dto'
import { makeGetInventorizationReportEndpoint } from 'features/reports/helpers'
import { InventorizationRequestArgs } from 'features/warehouse/types'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getInventorizationReportMockFn = ({ inventorizationId }: InventorizationRequestArgs) =>
  getRequestMockFn(HttpMethodEnum.Get, makeGetInventorizationReportEndpoint({ inventorizationId }))

export const mockGetInventorizationReportSuccess = (
  { inventorizationId }: InventorizationRequestArgs,
  options?: Partial<ResponseResolverOptions<GetInventorizationReportSuccessResponse>>,
) => getSuccessMockFn(getInventorizationReportMockFn({ inventorizationId }), options)()
