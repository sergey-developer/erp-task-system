import { GetInventorizationReportSuccessResponse } from 'modules/reports/models'
import { makeGetInventorizationReportUrl } from 'modules/reports/utils'
import { InventorizationRequestArgs } from 'modules/warehouse/types'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getInventorizationReportMockFn = ({ inventorizationId }: InventorizationRequestArgs) =>
  getRequestMockFn(HttpMethodEnum.Get, makeGetInventorizationReportUrl({ inventorizationId }))

export const mockGetInventorizationReportSuccess = (
  { inventorizationId }: InventorizationRequestArgs,
  options?: Partial<ResponseResolverOptions<GetInventorizationReportSuccessResponse>>,
) => getSuccessMockFn(getInventorizationReportMockFn({ inventorizationId }), options)()
