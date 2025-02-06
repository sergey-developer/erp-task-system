import { CreateInfrastructureOrderFormWorkSuccessResponse } from 'features/infrastructures/api/dto'
import { InfrastructuresEndpointsEnum } from 'features/infrastructures/constants'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const createCreateInfrastructureOrderFormWorkMockFn = () =>
  getRequestMockFn(
    HttpMethodEnum.Post,
    InfrastructuresEndpointsEnum.CreateInfrastructureOrderFormWork,
  )

export const mockCreateInfrastructureOrderFormWorkSuccess = (
  options?: Partial<ResponseResolverOptions<CreateInfrastructureOrderFormWorkSuccessResponse>>,
) => getSuccessMockFn(createCreateInfrastructureOrderFormWorkMockFn(), options)()
