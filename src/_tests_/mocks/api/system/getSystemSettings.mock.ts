import { HttpMethodEnum } from 'shared/constants/http'
import { SystemEndpointsEnum } from 'shared/system/api/constants/endpoints'
import { GetSystemSettingsSuccessResponse } from 'shared/system/api/dto/systemSettings'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getSystemSettingsMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, SystemEndpointsEnum.GetSystemSettings)

export const mockGetSystemSettingsSuccess = (
  options?: Partial<ResponseResolverOptions<GetSystemSettingsSuccessResponse>>,
) => getSuccessMockFn(getSystemSettingsMockFn(), options)()
