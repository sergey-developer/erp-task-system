import { HttpMethodEnum } from 'shared/constants/http'
import { SystemEndpointsEnum } from 'shared/system/api/constants/endpoints'
import { GetSystemInfoResponse } from 'shared/system/api/dto/systemInfo'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getSystemInfoMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, SystemEndpointsEnum.GetSystemInfo)

export const mockGetSystemInfoSuccess = (
  options?: Partial<ResponseResolverOptions<GetSystemInfoResponse>>,
) => getSuccessMockFn(getSystemInfoMockFn(), options)()
