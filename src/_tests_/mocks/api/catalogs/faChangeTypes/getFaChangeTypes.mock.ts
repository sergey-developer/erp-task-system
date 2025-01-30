import { CatalogsApiEnum } from 'shared/catalogs/constants'
import { HttpMethodEnum } from 'shared/constants/http'
import { GetFaChangeTypesSuccessResponse } from 'shared/catalogs/models/faChangeTypes'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getFaChangeTypesMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, CatalogsApiEnum.GetFaChangeTypes)

export const mockGetFaChangeTypesSuccess = (
  options?: Partial<ResponseResolverOptions<GetFaChangeTypesSuccessResponse>>,
) => getSuccessMockFn(getFaChangeTypesMockFn(), options)()
