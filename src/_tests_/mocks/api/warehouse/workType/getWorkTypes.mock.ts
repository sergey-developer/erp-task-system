import { CatalogEndpointsEnum } from 'features/warehouse/constants/workType'
import { GetWorkTypesCatalogSuccessResponse } from 'features/warehouse/models'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getWorkTypesMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, CatalogEndpointsEnum.GetWorkTypes)

export const mockGetWorkTypesSuccess = (
  options?: Partial<ResponseResolverOptions<GetWorkTypesCatalogSuccessResponse>>,
) => getSuccessMockFn(getWorkTypesMockFn(), options)()
