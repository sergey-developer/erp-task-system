import { CatalogApiPathsEnum } from 'shared/catalogs/api/constants'
import { GetLegalEntitiesCatalogResponse } from 'shared/catalogs/legalEntities/api/schemas'
import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getLegalEntitiesMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, CatalogApiPathsEnum.GetLegalEntities)

export const mockGetLegalEntitiesSuccess = (
  options?: Partial<ResponseResolverOptions<GetLegalEntitiesCatalogResponse>>,
) => getSuccessMockFn(getLegalEntitiesMockFn(), options)()
