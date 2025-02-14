import { UpdateInfrastructureResponse } from 'features/infrastructures/api/dto'
import { InfrastructureRequestArgs } from 'features/infrastructures/api/types'
import { makeUpdateInfrastructureEndpoint } from 'features/infrastructures/helpers/infrastructure/apiUrls'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const updateInfrastructureMockFn = ({ infrastructureId }: InfrastructureRequestArgs) =>
  getRequestMockFn(HttpMethodEnum.Patch, makeUpdateInfrastructureEndpoint({ infrastructureId }))

export const mockUpdateInfrastructureSuccess = (
  { infrastructureId }: InfrastructureRequestArgs,
  options?: Partial<ResponseResolverOptions<UpdateInfrastructureResponse>>,
) => getSuccessMockFn(updateInfrastructureMockFn({ infrastructureId }), options)()
