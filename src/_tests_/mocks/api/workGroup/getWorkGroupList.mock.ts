import { WorkGroupEndpointsEnum } from 'modules/workGroup/constants'
import { GetWorkGroupListSuccessResponse } from 'modules/workGroup/models'

import { HttpMethodEnum } from 'shared/constants/http'

import {
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
} from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getWorkGroupListMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, WorkGroupEndpointsEnum.GetWorkGroupList)

export const mockGetWorkGroupListSuccess = (
  options?: Partial<ResponseResolverOptions<GetWorkGroupListSuccessResponse>>,
) => getSuccessMockFn(getWorkGroupListMockFn(), options)()

export const mockGetWorkGroupListServerError = (
  options?: Partial<ResponseResolverOptions>,
) => getServerErrorMockFn(getWorkGroupListMockFn(), options)()
