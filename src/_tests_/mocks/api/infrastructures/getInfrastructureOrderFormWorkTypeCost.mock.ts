import { GetInfrastructureOrderFormWorkTypeCostResponse } from 'features/infrastructures/api/dto'
import { InfrastructuresApiPathsEnum } from 'features/infrastructures/constants'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getInfrastructureOrderFormWorkTypeCostMockFn = () =>
  getRequestMockFn(
    HttpMethodEnum.Get,
    InfrastructuresApiPathsEnum.GetInfrastructureOrderFormWorkTypeCost,
  )

export const mockGetInfrastructureOrderFormWorkTypeCostSuccess = (
  options?: Partial<ResponseResolverOptions<GetInfrastructureOrderFormWorkTypeCostResponse>>,
) => getSuccessMockFn(getInfrastructureOrderFormWorkTypeCostMockFn(), options)()
