import { InfrastructuresApiEnum } from 'modules/infrastructures/constants'
import { CreateInfrastructureOrderFormWorksSuccessResponse } from 'modules/infrastructures/models'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const createCreateInfrastructureOrderFormWorksMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Post, InfrastructuresApiEnum.CreateInfrastructureOrderFormWorks)

export const mockCreateInfrastructureOrderFormWorksSuccess = (
  options?: Partial<ResponseResolverOptions<CreateInfrastructureOrderFormWorksSuccessResponse>>,
) => getSuccessMockFn(createCreateInfrastructureOrderFormWorksMockFn(), options)()
