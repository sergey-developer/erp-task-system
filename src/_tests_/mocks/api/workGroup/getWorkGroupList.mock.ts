import { GetWorkGroupListSuccessResponse } from 'modules/workGroup/models'
import { WorkGroupApiEnum } from 'modules/workGroup/services/workGroupApiService'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getServerErrorMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getWorkGroupListMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, WorkGroupApiEnum.GetWorkGroupList)

export const mockGetWorkGroupListSuccess = (
  options?: Partial<ResponseResolverOptions<GetWorkGroupListSuccessResponse>>,
) => getSuccessMockFn(getWorkGroupListMockFn(), options)()

export const mockGetWorkGroupListServerError = (options?: Partial<ResponseResolverOptions>) =>
  getServerErrorMockFn(getWorkGroupListMockFn(), options)()
