import { GetInventorizationReportSuccessResponse } from 'features/reports/models'
import { makeGetInventorizationReportUrl } from 'features/reports/utils'
import { InventorizationRequestArgs } from 'features/warehouse/types'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getInventorizationReportMockFn = ({ inventorizationId }: InventorizationRequestArgs) =>
  getRequestMockFn(HttpMethodEnum.Get, makeGetInventorizationReportUrl({ inventorizationId }))

export const mockGetInventorizationReportSuccess = (
  { inventorizationId }: InventorizationRequestArgs,
  options?: Partial<ResponseResolverOptions<GetInventorizationReportSuccessResponse>>,
) => getSuccessMockFn(getInventorizationReportMockFn({ inventorizationId }), options)()
