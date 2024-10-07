import { InfrastructuresApiEnum } from 'modules/infrastructures/constants'
import { CreateInfrastructureOrderFormWorkSuccessResponse } from 'modules/infrastructures/models'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const createCreateInfrastructureOrderFormWorkMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Post, InfrastructuresApiEnum.CreateInfrastructureOrderFormWork)

export const mockCreateInfrastructureOrderFormWorkSuccess = (
  options?: Partial<ResponseResolverOptions<CreateInfrastructureOrderFormWorkSuccessResponse>>,
) => getSuccessMockFn(createCreateInfrastructureOrderFormWorkMockFn(), options)()
