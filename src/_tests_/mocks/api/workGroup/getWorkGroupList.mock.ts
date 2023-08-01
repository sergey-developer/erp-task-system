import { WorkGroupEndpointsEnum } from 'modules/workGroup/constants/api'
import { GetWorkGroupListSuccessResponse } from 'modules/workGroup/models'

import { HttpMethodEnum } from 'shared/constants/http'
import { ErrorData } from 'shared/services/api'

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

export const mockGetWorkGroupListServerError = <T extends object>(
  options?: Partial<ResponseResolverOptions<ErrorData<T>>>,
) => getServerErrorMockFn(getWorkGroupListMockFn(), options)()
