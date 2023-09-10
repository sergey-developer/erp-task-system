import { HttpMethodEnum } from 'shared/constants/http'
import { SystemApiEnum } from 'shared/constants/system'
import { GetSystemInfoSuccessResponse } from 'shared/models'

import { getRequestMockFn, getSuccessMockFn, ResponseResolverOptions } from '_tests_/mocks/api'

const getSystemInfoMockFn = () => getRequestMockFn(HttpMethodEnum.Get, SystemApiEnum.GetSystemInfo)

export const mockGetSystemInfoSuccess = (
  options?: Partial<ResponseResolverOptions<GetSystemInfoSuccessResponse>>,
) => getSuccessMockFn(getSystemInfoMockFn(), options)()
