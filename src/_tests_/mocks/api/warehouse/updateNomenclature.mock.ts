import {
  UpdateNomenclatureBadRequestErrorResponse,
  UpdateNomenclatureSuccessResponse,
} from 'modules/warehouse/models'
import { updateNomenclatureUrl } from 'modules/warehouse/utils'

import { HttpMethodEnum } from 'shared/constants/http'
import { ErrorData } from 'shared/services/baseApi'
import { IdType } from 'shared/types/common'

import {
  getBadRequestErrorMockFn,
  getForbiddenErrorMockFn,
  getNotFoundErrorMockFn,
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
} from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const updateNomenclatureMockFn = (id: IdType) =>
  getRequestMockFn(HttpMethodEnum.Patch, updateNomenclatureUrl(id))

export const mockUpdateNomenclatureSuccess = (
  id: IdType,
  options?: Partial<ResponseResolverOptions<UpdateNomenclatureSuccessResponse>>,
) => getSuccessMockFn(updateNomenclatureMockFn(id), options)()

export const mockUpdateNomenclatureBadRequestError = <
  T extends UpdateNomenclatureBadRequestErrorResponse,
>(
  id: IdType,
  options?: Partial<ResponseResolverOptions<ErrorData<T>>>,
) => getBadRequestErrorMockFn(updateNomenclatureMockFn(id), options)()

export const mockUpdateNomenclatureNotFoundError = (
  id: IdType,
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getNotFoundErrorMockFn(updateNomenclatureMockFn(id), options)()

export const mockUpdateNomenclatureForbiddenError = (
  id: IdType,
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getForbiddenErrorMockFn(updateNomenclatureMockFn(id), options)()

export const mockUpdateNomenclatureServerError = (
  id: IdType,
  options?: Partial<ResponseResolverOptions>,
) => getServerErrorMockFn(updateNomenclatureMockFn(id), options)()
