import { InfrastructuresApiEnum } from 'features/infrastructures/constants'
import { GetInfrastructureStatusHistorySuccessResponse } from 'features/infrastructures/models'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getInfrastructureStatusHistoryMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, InfrastructuresApiEnum.GetInfrastructureStatusHistory)

export const mockGetInfrastructureStatusHistorySuccess = (
  options?: Partial<ResponseResolverOptions<GetInfrastructureStatusHistorySuccessResponse>>,
) => getSuccessMockFn(getInfrastructureStatusHistoryMockFn(), options)()
