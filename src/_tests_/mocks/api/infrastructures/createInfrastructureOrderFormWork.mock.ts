import { InfrastructuresApiPathsEnum } from 'features/infrastructures/api/constants'
import { CreateInfrastructureOrderFormWorkResponse } from 'features/infrastructures/api/schemas'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/api/request'
import { ResponseResolverOptions } from '_tests_/mocks/api/response'

const createCreateInfrastructureOrderFormWorkMockFn = () =>
  getRequestMockFn(
    HttpMethodEnum.Post,
    InfrastructuresApiPathsEnum.CreateInfrastructureOrderFormWork,
  )

export const mockCreateInfrastructureOrderFormWorkSuccess = (
  options?: Partial<ResponseResolverOptions<CreateInfrastructureOrderFormWorkResponse>>,
) => getSuccessMockFn(createCreateInfrastructureOrderFormWorkMockFn(), options)()
