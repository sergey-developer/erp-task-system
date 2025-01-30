import { GetInfrastructureSuccessResponse } from 'features/infrastructures/models'
import { InfrastructureRequestArgs } from 'features/infrastructures/types'
import { makeGetInfrastructureUrl } from 'features/infrastructures/utils/infrastructure/apiUrls'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getInfrastructureMockFn = ({ infrastructureId }: InfrastructureRequestArgs) =>
  getRequestMockFn(HttpMethodEnum.Get, makeGetInfrastructureUrl({ infrastructureId }))

export const mockGetInfrastructureSuccess = (
  { infrastructureId }: InfrastructureRequestArgs,
  options?: Partial<ResponseResolverOptions<GetInfrastructureSuccessResponse>>,
) => getSuccessMockFn(getInfrastructureMockFn({ infrastructureId }), options)()
