import { UpdateInfrastructureSuccessResponse } from 'modules/infrastructures/models'
import { InfrastructureRequestArgs } from 'modules/infrastructures/types'
import { makeUpdateInfrastructureUrl } from 'modules/infrastructures/utils/apiUrls'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const updateInfrastructureMockFn = ({ infrastructureId }: InfrastructureRequestArgs) =>
  getRequestMockFn(HttpMethodEnum.Patch, makeUpdateInfrastructureUrl({ infrastructureId }))

export const mockUpdateInfrastructureSuccess = (
  { infrastructureId }: InfrastructureRequestArgs,
  options?: Partial<ResponseResolverOptions<UpdateInfrastructureSuccessResponse>>,
) => getSuccessMockFn(updateInfrastructureMockFn({ infrastructureId }), options)()
