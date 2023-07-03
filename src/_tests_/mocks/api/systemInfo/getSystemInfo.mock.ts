import { HttpMethodEnum } from 'shared/constants/http'
import { BaseApiEnum } from 'shared/services/api'
import { GetSystemInfoSuccessResponse } from 'shared/services/api/models'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getSystemInfoMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, BaseApiEnum.GetSystemInfo)

export const mockGetSystemInfoSuccess = (
  options?: Partial<ResponseResolverOptions<GetSystemInfoSuccessResponse>>,
) => getSuccessMockFn(getSystemInfoMockFn(), options)()
