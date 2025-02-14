import { HttpMethodEnum } from 'shared/constants/http'
import { WorkGroupsApiPathsEnum } from 'shared/workGroups/api/constants'
import { GetWorkGroupsResponse } from 'shared/workGroups/api/dto'

import { getRequestMockFn, getServerErrorMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getWorkGroupsMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, WorkGroupsApiPathsEnum.GetWorkGroups)

export const mockGetWorkGroupsSuccess = (
  options?: Partial<ResponseResolverOptions<GetWorkGroupsResponse>>,
) => getSuccessMockFn(getWorkGroupsMockFn(), options)()

export const mockGetWorkGroupsServerError = (options?: Partial<ResponseResolverOptions>) =>
  getServerErrorMockFn(getWorkGroupsMockFn(), options)()
