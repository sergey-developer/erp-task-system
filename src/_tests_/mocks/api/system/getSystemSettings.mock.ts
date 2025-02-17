import { HttpMethodEnum } from 'shared/constants/http'
import { SystemApiPathsEnum } from 'shared/system/api/constants/endpoints'
import { GetSystemSettingsResponse } from 'shared/system/api/schemas'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/api/request'
import { ResponseResolverOptions } from '_tests_/mocks/api/response'

const getSystemSettingsMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, SystemApiPathsEnum.GetSystemSettings)

export const mockGetSystemSettingsSuccess = (
  options?: Partial<ResponseResolverOptions<GetSystemSettingsResponse>>,
) => getSuccessMockFn(getSystemSettingsMockFn(), options)()
