import { UpdateInfrastructureSuccessResponse } from 'features/infrastructures/api/dto'
import { makeUpdateInfrastructureEndpoint } from 'features/infrastructures/helpers/infrastructure/apiUrls'
import { InfrastructureRequestArgs } from 'features/infrastructures/types'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const updateInfrastructureMockFn = ({ infrastructureId }: InfrastructureRequestArgs) =>
  getRequestMockFn(HttpMethodEnum.Patch, makeUpdateInfrastructureEndpoint({ infrastructureId }))

export const mockUpdateInfrastructureSuccess = (
  { infrastructureId }: InfrastructureRequestArgs,
  options?: Partial<ResponseResolverOptions<UpdateInfrastructureSuccessResponse>>,
) => getSuccessMockFn(updateInfrastructureMockFn({ infrastructureId }), options)()
