import { UpdateInfrastructureResponse } from 'features/infrastructures/api/dto'
import { RequestWithInfrastructure } from 'features/infrastructures/api/types'
import { makeUpdateInfrastructureEndpoint } from 'features/infrastructures/helpers/infrastructure/apiUrls'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const updateInfrastructureMockFn = ({ infrastructureId }: RequestWithInfrastructure) =>
  getRequestMockFn(HttpMethodEnum.Patch, makeUpdateInfrastructureApiPath({ infrastructureId }))

export const mockUpdateInfrastructureSuccess = (
  { infrastructureId }: RequestWithInfrastructure,
  options?: Partial<ResponseResolverOptions<UpdateInfrastructureResponse>>,
) => getSuccessMockFn(updateInfrastructureMockFn({ infrastructureId }), options)()
