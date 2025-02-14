import { makeGetInfrastructureEndpoint } from 'features/infrastructures/api/helpers'
import { GetInfrastructureResponse } from 'features/infrastructures/api/schemas'
import { RequestWithInfrastructure } from 'features/infrastructures/api/types'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getInfrastructureMockFn = ({ infrastructureId }: RequestWithInfrastructure) =>
  getRequestMockFn(HttpMethodEnum.Get, makeGetInfrastructureEndpoint({ infrastructureId }))

export const mockGetInfrastructureSuccess = (
  { infrastructureId }: RequestWithInfrastructure,
  options?: Partial<ResponseResolverOptions<GetInfrastructureResponse>>,
) => getSuccessMockFn(getInfrastructureMockFn({ infrastructureId }), options)()
