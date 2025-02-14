import { CatalogApiPathsEnum } from 'features/warehouse/constants/workType'
import { GetWorkTypesCatalogResponse } from 'features/warehouse/models'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getWorkTypesMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, CatalogApiPathsEnum.GetWorkTypes)

export const mockGetWorkTypesSuccess = (
  options?: Partial<ResponseResolverOptions<GetWorkTypesCatalogResponse>>,
) => getSuccessMockFn(getWorkTypesMockFn(), options)()
