import { GetInfrastructureOrdersFormsSuccessResponse } from 'features/infrastructures/api/dto'
import { InfrastructuresEndpointsEnum } from 'features/infrastructures/constants'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getInfrastructureOrdersFormsMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, InfrastructuresEndpointsEnum.GetInfrastructureOrdersForms)

export const mockGetInfrastructureOrdersFormsSuccess = (
  options?: Partial<ResponseResolverOptions<GetInfrastructureOrdersFormsSuccessResponse>>,
) => getSuccessMockFn(getInfrastructureOrdersFormsMockFn(), options)()
