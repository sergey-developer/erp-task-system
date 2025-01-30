import { InfrastructuresApiEnum } from 'features/infrastructures/constants'
import { GetInfrastructureOrdersFormsSuccessResponse } from 'features/infrastructures/models'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getInfrastructureOrdersFormsMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, InfrastructuresApiEnum.GetInfrastructureOrdersForms)

export const mockGetInfrastructureOrdersFormsSuccess = (
  options?: Partial<ResponseResolverOptions<GetInfrastructureOrdersFormsSuccessResponse>>,
) => getSuccessMockFn(getInfrastructureOrdersFormsMockFn(), options)()
