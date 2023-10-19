import { HttpMethodEnum } from 'shared/constants/http'
import { MacroregionApiEnum } from 'shared/constants/macroregion'
import { GetMacroregionListSuccessResponse } from 'shared/models/macroregion'

import { getRequestMockFn, getServerErrorMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getMacroregionListMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, MacroregionApiEnum.GetMacroregionList)

export const mockGetMacroregionListSuccess = (
  options?: Partial<ResponseResolverOptions<GetMacroregionListSuccessResponse>>,
) => getSuccessMockFn(getMacroregionListMockFn(), options)()

export const mockGetMacroregionListServerError = (options?: Partial<ResponseResolverOptions>) =>
  getServerErrorMockFn(getMacroregionListMockFn(), options)()
