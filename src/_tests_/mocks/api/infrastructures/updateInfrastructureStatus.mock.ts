import { UpdateInfrastructureStatusResponse } from 'features/infrastructures/api/dto'
import { InfrastructuresEndpointsEnum } from 'features/infrastructures/constants'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const updateInfrastructureStatusMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Post, InfrastructuresEndpointsEnum.UpdateInfrastructureStatus)

export const mockUpdateInfrastructureStatusSuccess = (
  options?: Partial<ResponseResolverOptions<UpdateInfrastructureStatusResponse>>,
) => getSuccessMockFn(updateInfrastructureStatusMockFn(), options)()
