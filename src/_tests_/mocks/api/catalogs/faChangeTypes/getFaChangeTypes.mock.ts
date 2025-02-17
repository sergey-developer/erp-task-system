import { CatalogApiPathsEnum } from 'shared/catalogs/api/constants/endpoints'
import { GetFaChangeTypesCatalogResponse } from 'shared/catalogs/faChangeTypes/api/schemas'
import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/api/request'
import { ResponseResolverOptions } from '_tests_/mocks/api/response'

const getFaChangeTypesMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, CatalogApiPathsEnum.GetFaChangeTypes)

export const mockGetFaChangeTypesSuccess = (
  options?: Partial<ResponseResolverOptions<GetFaChangeTypesCatalogResponse>>,
) => getSuccessMockFn(getFaChangeTypesMockFn(), options)()
