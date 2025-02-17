import { InfrastructuresApiPathsEnum } from 'features/infrastructures/api/constants'
import { UpdateInfrastructureStatusResponse } from 'features/infrastructures/api/schemas'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/api/request'
import { ResponseResolverOptions } from '_tests_/mocks/api/response'

const updateInfrastructureStatusMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Post, InfrastructuresApiPathsEnum.UpdateInfrastructureStatus)

export const mockUpdateInfrastructureStatusSuccess = (
  options?: Partial<ResponseResolverOptions<UpdateInfrastructureStatusResponse>>,
) => getSuccessMockFn(updateInfrastructureStatusMockFn(), options)()
