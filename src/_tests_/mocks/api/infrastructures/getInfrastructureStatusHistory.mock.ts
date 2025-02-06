import { GetInfrastructureStatusHistorySuccessResponse } from 'features/infrastructures/api/dto'
import { InfrastructuresEndpointsEnum } from 'features/infrastructures/constants'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getInfrastructureStatusHistoryMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, InfrastructuresEndpointsEnum.GetInfrastructureStatusHistory)

export const mockGetInfrastructureStatusHistorySuccess = (
  options?: Partial<ResponseResolverOptions<GetInfrastructureStatusHistorySuccessResponse>>,
) => getSuccessMockFn(getInfrastructureStatusHistoryMockFn(), options)()
