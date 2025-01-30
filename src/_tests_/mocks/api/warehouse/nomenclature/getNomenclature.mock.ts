import { GetNomenclatureSuccessResponse } from 'features/warehouse/models'
import { getNomenclatureUrl } from 'features/warehouse/utils/nomenclature'

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

const getNomenclatureMockFn = (id: IdType) =>
  getRequestMockFn(HttpMethodEnum.Get, getNomenclatureUrl(id))

export const mockGetNomenclatureSuccess = (
  id: IdType,
  options?: Partial<ResponseResolverOptions<GetNomenclatureSuccessResponse>>,
) => getSuccessMockFn(getNomenclatureMockFn(id), options)()

export const mockGetNomenclatureNotFoundError = (
  id: IdType,
  options?: Partial<ResponseResolverOptions>,
) => getNotFoundErrorMockFn(getNomenclatureMockFn(id), options)()

export const mockGetNomenclatureForbiddenError = (
  id: IdType,
  options?: Partial<ResponseResolverOptions>,
) => getForbiddenErrorMockFn(getNomenclatureMockFn(id), options)()

export const mockGetNomenclatureServerError = (
  id: IdType,
  options?: Partial<ResponseResolverOptions>,
) => getServerErrorMockFn(getNomenclatureMockFn(id), options)()
