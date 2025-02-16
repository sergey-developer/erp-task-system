import { InfrastructuresApiPathsEnum } from 'features/infrastructures/api/constants'
import { GetInfrastructureOrdersFormsResponse } from 'features/infrastructures/api/schemas'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getInfrastructureOrdersFormsMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, InfrastructuresApiPathsEnum.GetInfrastructureOrdersForms)

export const mockGetInfrastructureOrdersFormsSuccess = (
  options?: Partial<ResponseResolverOptions<GetInfrastructureOrdersFormsResponse>>,
) => getSuccessMockFn(getInfrastructureOrdersFormsMockFn(), options)()
