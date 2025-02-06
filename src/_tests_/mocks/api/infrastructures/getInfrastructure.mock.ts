import { GetInfrastructureSuccessResponse } from 'features/infrastructures/api/dto'
import { makeGetInfrastructureEndpoint } from 'features/infrastructures/helpers/infrastructure/apiUrls'
import { InfrastructureRequestArgs } from 'features/infrastructures/types'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getInfrastructureMockFn = ({ infrastructureId }: InfrastructureRequestArgs) =>
  getRequestMockFn(HttpMethodEnum.Get, makeGetInfrastructureEndpoint({ infrastructureId }))

export const mockGetInfrastructureSuccess = (
  { infrastructureId }: InfrastructureRequestArgs,
  options?: Partial<ResponseResolverOptions<GetInfrastructureSuccessResponse>>,
) => getSuccessMockFn(getInfrastructureMockFn({ infrastructureId }), options)()
