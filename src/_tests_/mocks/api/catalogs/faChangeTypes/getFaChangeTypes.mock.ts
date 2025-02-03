import { CatalogEndpointsEnum } from 'shared/catalogs/api/constants/endpoints'
import { GetFaChangeTypesCatalogSuccessResponse } from 'shared/catalogs/faChangeTypes/api/schemas/getFaChangeTypesCatalog.schema'
import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getFaChangeTypesMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, CatalogEndpointsEnum.GetFaChangeTypes)

export const mockGetFaChangeTypesSuccess = (
  options?: Partial<ResponseResolverOptions<GetFaChangeTypesCatalogSuccessResponse>>,
) => getSuccessMockFn(getFaChangeTypesMockFn(), options)()
