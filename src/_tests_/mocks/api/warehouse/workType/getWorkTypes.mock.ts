import { CatalogApiPathsEnum } from 'shared/catalogs/api/constants'
import { GetWorkTypesCatalogResponse } from 'shared/catalogs/workTypes/api/schemas'
import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getWorkTypesMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, CatalogApiPathsEnum.GetWorkTypes)

export const mockGetWorkTypesSuccess = (
  options?: Partial<ResponseResolverOptions<GetWorkTypesCatalogResponse>>,
) => getSuccessMockFn(getWorkTypesMockFn(), options)()
