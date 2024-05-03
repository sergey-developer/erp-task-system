import { GetInventorizationSuccessResponse } from 'modules/warehouse/models'
import { getInventorizationUrl } from 'modules/warehouse/utils/inventorization'

import { HttpMethodEnum } from 'shared/constants/http'
import { IdType } from 'shared/types/common'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getInventorizationMockFn = (id: IdType) =>
  getRequestMockFn(HttpMethodEnum.Get, getInventorizationUrl(id))

export const mockGetInventorizationSuccess = (
  id: IdType,
  options?: Partial<ResponseResolverOptions<GetInventorizationSuccessResponse>>,
) => getSuccessMockFn(getInventorizationMockFn(id), options)()
