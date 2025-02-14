import { HttpMethodEnum } from 'shared/constants/http'
import { SystemApiPathsEnum } from 'shared/system/api/constants/endpoints'
import { GetSystemSettingsResponse } from 'shared/system/api/dto/systemSettings'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getSystemSettingsMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, SystemApiPathsEnum.GetSystemSettings)

export const mockGetSystemSettingsSuccess = (
  options?: Partial<ResponseResolverOptions<GetSystemSettingsResponse>>,
) => getSuccessMockFn(getSystemSettingsMockFn(), options)()
