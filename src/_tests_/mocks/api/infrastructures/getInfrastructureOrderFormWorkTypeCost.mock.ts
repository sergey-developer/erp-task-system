import { InfrastructuresApiEnum } from 'modules/infrastructures/constants'
import { GetInfrastructureOrderFormWorkTypeCostSuccessResponse } from 'modules/infrastructures/models'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getInfrastructureOrderFormWorkTypeCostMockFn = () =>
  getRequestMockFn(
    HttpMethodEnum.Get,
    InfrastructuresApiEnum.GetInfrastructureOrderFormWorkTypeCost,
  )

export const mockGetInfrastructureOrderFormWorkTypeCostSuccess = (
  options?: Partial<ResponseResolverOptions<GetInfrastructureOrderFormWorkTypeCostSuccessResponse>>,
) => getSuccessMockFn(getInfrastructureOrderFormWorkTypeCostMockFn(), options)()
