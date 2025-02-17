import { HttpMethodEnum } from 'shared/constants/http'
import { WorkGroupsApiPathsEnum } from 'shared/workGroups/api/constants'
import { GetWorkGroupsResponse } from 'shared/workGroups/api/schemas'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/api/request'
import { ResponseResolverOptions } from '_tests_/mocks/api/response'

const getWorkGroupsMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, WorkGroupsApiPathsEnum.GetWorkGroups)

export const mockGetWorkGroupsSuccess = (
  options?: Partial<ResponseResolverOptions<GetWorkGroupsResponse>>,
) => getSuccessMockFn(getWorkGroupsMockFn(), options)()
