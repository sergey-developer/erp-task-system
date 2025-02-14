import { GetInfrastructureStatusHistoryResponse } from 'features/infrastructures/api/dto'
import { InfrastructuresApiPathsEnum } from 'features/infrastructures/constants'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getInfrastructureStatusHistoryMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, InfrastructuresApiPathsEnum.GetInfrastructureStatusHistory)

export const mockGetInfrastructureStatusHistorySuccess = (
  options?: Partial<ResponseResolverOptions<GetInfrastructureStatusHistoryResponse>>,
) => getSuccessMockFn(getInfrastructureStatusHistoryMockFn(), options)()
