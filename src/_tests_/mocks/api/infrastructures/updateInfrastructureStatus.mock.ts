import { InfrastructuresApiEnum } from 'modules/infrastructures/constants'
import { UpdateInfrastructureStatusSuccessResponse } from 'modules/infrastructures/models'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const updateInfrastructureStatusMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Post, InfrastructuresApiEnum.UpdateInfrastructureStatus)

export const mockUpdateInfrastructureStatusSuccess = (
  options?: Partial<ResponseResolverOptions<UpdateInfrastructureStatusSuccessResponse>>,
) => getSuccessMockFn(updateInfrastructureStatusMockFn(), options)()
