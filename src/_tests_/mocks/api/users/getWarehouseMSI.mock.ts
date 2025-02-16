import { makeGetWarehouseMSIApiPath } from 'features/users/api/helpers'
import { GetWarehouseMSIResponse } from 'features/users/api/schemas'

import { HttpMethodEnum } from 'shared/constants/http'
import { IdType } from 'shared/types/common'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getWarehouseMSIMockFn = (id: IdType) =>
  getRequestMockFn(HttpMethodEnum.Get, makeGetWarehouseMSIApiPath(id))

export const mockGetWarehouseMSISuccess = (
  id: IdType,
  options?: Partial<ResponseResolverOptions<GetWarehouseMSIResponse>>,
) => getSuccessMockFn(getWarehouseMSIMockFn(id), options)()
