import { GetInfrastructureOrderFormWorkTypeCostSuccessResponse } from 'features/infrastructures/api/dto'
import { InfrastructuresEndpointsEnum } from 'features/infrastructures/constants'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getInfrastructureOrderFormWorkTypeCostMockFn = () =>
  getRequestMockFn(
    HttpMethodEnum.Get,
    InfrastructuresEndpointsEnum.GetInfrastructureOrderFormWorkTypeCost,
  )

export const mockGetInfrastructureOrderFormWorkTypeCostSuccess = (
  options?: Partial<ResponseResolverOptions<GetInfrastructureOrderFormWorkTypeCostSuccessResponse>>,
) => getSuccessMockFn(getInfrastructureOrderFormWorkTypeCostMockFn(), options)()
