import { InfrastructuresApiPathsEnum } from 'features/infrastructures/api/constants'
import { GetInfrastructureOrdersFormsResponse } from 'features/infrastructures/api/schemas'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/api/request'
import { ResponseResolverOptions } from '_tests_/mocks/api/response'

const getInfrastructureOrdersFormsMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, InfrastructuresApiPathsEnum.GetInfrastructureOrdersForms)

export const mockGetInfrastructureOrdersFormsSuccess = (
  options?: Partial<ResponseResolverOptions<GetInfrastructureOrdersFormsResponse>>,
) => getSuccessMockFn(getInfrastructureOrdersFormsMockFn(), options)()
