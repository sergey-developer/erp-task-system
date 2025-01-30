import { InfrastructuresApiEnum } from 'features/infrastructures/constants'
import { CreateInfrastructureOrderFormWorkSuccessResponse } from 'features/infrastructures/models'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const createCreateInfrastructureOrderFormWorkMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Post, InfrastructuresApiEnum.CreateInfrastructureOrderFormWork)

export const mockCreateInfrastructureOrderFormWorkSuccess = (
  options?: Partial<ResponseResolverOptions<CreateInfrastructureOrderFormWorkSuccessResponse>>,
) => getSuccessMockFn(createCreateInfrastructureOrderFormWorkMockFn(), options)()
