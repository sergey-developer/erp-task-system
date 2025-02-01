import { HttpMethodEnum } from 'shared/constants/http'
import { WorkGroupsEndpointsEnum } from 'shared/workGroups/api/constants'
import { GetWorkGroupsSuccessResponse } from 'shared/workGroups/api/dto'

import { getRequestMockFn, getServerErrorMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getWorkGroupsMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, WorkGroupsEndpointsEnum.GetWorkGroups)

export const mockGetWorkGroupsSuccess = (
  options?: Partial<ResponseResolverOptions<GetWorkGroupsSuccessResponse>>,
) => getSuccessMockFn(getWorkGroupsMockFn(), options)()

export const mockGetWorkGroupsServerError = (options?: Partial<ResponseResolverOptions>) =>
  getServerErrorMockFn(getWorkGroupsMockFn(), options)()
