import { WorkGroupApiEnum } from 'modules/workGroup/constants'
import { GetWorkGroupsSuccessResponse } from 'modules/workGroup/models'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getServerErrorMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getWorkGroupsMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, WorkGroupApiEnum.GetWorkGroups)

export const mockGetWorkGroupsSuccess = (
  options?: Partial<ResponseResolverOptions<GetWorkGroupsSuccessResponse>>,
) => getSuccessMockFn(getWorkGroupsMockFn(), options)()

export const mockGetWorkGroupsServerError = (options?: Partial<ResponseResolverOptions>) =>
  getServerErrorMockFn(getWorkGroupsMockFn(), options)()
