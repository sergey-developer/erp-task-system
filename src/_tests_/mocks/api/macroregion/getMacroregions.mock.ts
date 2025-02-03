import { CatalogEndpointsEnum } from 'shared/catalogs/api/constants/endpoints'
import { GetMacroregionsCatalogSuccessResponse } from 'shared/catalogs/macroregions/api/schemas/getMacroregionsCatalog.schema'
import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getMacroregionsMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, CatalogEndpointsEnum.GetMacroregions)

export const mockGetMacroregionsSuccess = (
  options?: Partial<ResponseResolverOptions<GetMacroregionsCatalogSuccessResponse>>,
) => getSuccessMockFn(getMacroregionsMockFn(), options)()
