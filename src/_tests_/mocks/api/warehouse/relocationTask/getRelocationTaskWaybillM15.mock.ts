import { getRelocationTaskWaybillM15Url } from 'features/relocationTasks/api/helpers'
import { GetRelocationTaskWaybillM15Response } from 'features/warehouses/api/dto'

import { ErrorData } from 'shared/api/baseApi'
import { HttpMethodEnum } from 'shared/constants/http'
import { IdType } from 'shared/types/common'

import {
  getForbiddenErrorMockFn,
  getNotFoundErrorMockFn,
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
} from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getRelocationTaskWaybillM15MockFn = (id: IdType) =>
  getRequestMockFn(HttpMethodEnum.Get, getRelocationTaskWaybillM15Url(id))

export const mockGetRelocationTaskWaybillM15Success = (
  id: IdType,
  options?: Partial<ResponseResolverOptions<GetRelocationTaskWaybillM15Response>>,
) => getSuccessMockFn(getRelocationTaskWaybillM15MockFn(id), options)()

export const mockGetRelocationTaskWaybillM15NotFoundError = (
  id: IdType,
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getNotFoundErrorMockFn(getRelocationTaskWaybillM15MockFn(id), options)()

export const mockGetRelocationTaskWaybillM15ForbiddenError = (
  id: IdType,
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getForbiddenErrorMockFn(getRelocationTaskWaybillM15MockFn(id), options)()

export const mockGetRelocationTaskWaybillM15ServerError = (
  id: IdType,
  options?: Partial<ResponseResolverOptions>,
) => getServerErrorMockFn(getRelocationTaskWaybillM15MockFn(id), options)()
