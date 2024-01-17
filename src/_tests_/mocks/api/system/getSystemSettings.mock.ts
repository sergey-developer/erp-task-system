import { HttpMethodEnum } from 'shared/constants/http'
import { SystemApiEnum } from 'shared/constants/system'
import { GetSystemSettingsSuccessResponse } from 'shared/models/system'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getSystemSettingsMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, SystemApiEnum.GetSystemSettings)

export const mockGetSystemSettingsSuccess = (
  options?: Partial<ResponseResolverOptions<GetSystemSettingsSuccessResponse>>,
) => getSuccessMockFn(getSystemSettingsMockFn(), options)()
