import { GetMacroregionsCatalogSuccessResponse } from 'shared/catalogs/api/dto/macroregions'
import { HttpMethodEnum } from 'shared/constants/http'
import { MacroregionApiEnum } from 'shared/constants/macroregion'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getMacroregionsMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, MacroregionApiEnum.GetMacroregions)

export const mockGetMacroregionsSuccess = (
  options?: Partial<ResponseResolverOptions<GetMacroregionsCatalogSuccessResponse>>,
) => getSuccessMockFn(getMacroregionsMockFn(), options)()
