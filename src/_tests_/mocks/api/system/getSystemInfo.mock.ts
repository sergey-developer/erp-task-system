import { HttpMethodEnum } from 'shared/constants/http'
import { SystemApiEnum } from 'shared/constants/system'
import { GetSystemInfoSuccessResponse } from 'shared/models'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getSystemInfoMockFn = () => getRequestMockFn(HttpMethodEnum.Get, SystemApiEnum.GetSystemInfo)

export const mockGetSystemInfoSuccess = (
  options?: Partial<ResponseResolverOptions<GetSystemInfoSuccessResponse>>,
) => getSuccessMockFn(getSystemInfoMockFn(), options)()
