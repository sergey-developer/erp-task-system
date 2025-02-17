import { HttpMethodEnum } from 'shared/constants/http'
import { SystemApiPathsEnum } from 'shared/system/api/constants/endpoints'
import { GetSystemInfoResponse } from 'shared/system/api/schemas'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/api/request'
import { ResponseResolverOptions } from '_tests_/mocks/api/response'

const getSystemInfoMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, SystemApiPathsEnum.GetSystemInfo)

export const mockGetSystemInfoSuccess = (
  options?: Partial<ResponseResolverOptions<GetSystemInfoResponse>>,
) => getSuccessMockFn(getSystemInfoMockFn(), options)()
