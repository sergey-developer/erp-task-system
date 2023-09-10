import { WorkGroupApiEnum } from 'modules/workGroup/constants'
import { GetWorkGroupListSuccessResponse } from 'modules/workGroup/models'

import { HttpMethodEnum } from 'shared/constants/http'

import {
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
  ResponseResolverOptions,
} from '_tests_/mocks/api'

const getWorkGroupListMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, WorkGroupApiEnum.GetWorkGroupList)

export const mockGetWorkGroupListSuccess = (
  options?: Partial<ResponseResolverOptions<GetWorkGroupListSuccessResponse>>,
) => getSuccessMockFn(getWorkGroupListMockFn(), options)()

export const mockGetWorkGroupListServerError = (options?: Partial<ResponseResolverOptions>) =>
  getServerErrorMockFn(getWorkGroupListMockFn(), options)()
