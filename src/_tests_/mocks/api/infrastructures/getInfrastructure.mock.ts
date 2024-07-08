import { GetInfrastructureSuccessResponse } from 'modules/infrastructures/models'
import { InfrastructureRequestArgs } from 'modules/infrastructures/types'
import { makeGetInfrastructureUrl } from 'modules/infrastructures/utils/apiUrls'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getInfrastructureMockFn = ({ infrastructureId }: InfrastructureRequestArgs) =>
  getRequestMockFn(HttpMethodEnum.Get, makeGetInfrastructureUrl({ infrastructureId }))

export const mockGetInfrastructureSuccess = (
  { infrastructureId }: InfrastructureRequestArgs,
  options?: Partial<ResponseResolverOptions<GetInfrastructureSuccessResponse>>,
) => getSuccessMockFn(getInfrastructureMockFn({ infrastructureId }), options)()
