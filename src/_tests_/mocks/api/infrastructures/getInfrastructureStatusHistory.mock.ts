import { InfrastructuresApiPathsEnum } from 'features/infrastructures/api/constants'
import { GetInfrastructureStatusHistoryResponse } from 'features/infrastructures/api/schemas'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/api/request'
import { ResponseResolverOptions } from '_tests_/mocks/api/response'

const getInfrastructureStatusHistoryMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, InfrastructuresApiPathsEnum.GetInfrastructureStatusHistory)

export const mockGetInfrastructureStatusHistorySuccess = (
  options?: Partial<ResponseResolverOptions<GetInfrastructureStatusHistoryResponse>>,
) => getSuccessMockFn(getInfrastructureStatusHistoryMockFn(), options)()
