import {
  UpdateNomenclatureGroupBadRequestErrorResponse,
  UpdateNomenclatureGroupSuccessResponse,
} from 'modules/warehouse/models'
import { updateNomenclatureGroupUrl } from 'modules/warehouse/utils'

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
  ResponseResolverOptions,
} from '_tests_/mocks/api'

const updateNomenclatureGroupMockFn = (id: IdType) =>
  getRequestMockFn(HttpMethodEnum.Patch, updateNomenclatureGroupUrl(id))

export const mockUpdateNomenclatureGroupSuccess = (
  id: IdType,
  options?: Partial<ResponseResolverOptions<UpdateNomenclatureGroupSuccessResponse>>,
) => getSuccessMockFn(updateNomenclatureGroupMockFn(id), options)()

export const mockUpdateNomenclatureGroupBadRequestError = <
  T extends UpdateNomenclatureGroupBadRequestErrorResponse,
>(
  id: IdType,
  options?: Partial<ResponseResolverOptions<ErrorData<T>>>,
) => getBadRequestErrorMockFn(updateNomenclatureGroupMockFn(id), options)()

export const mockUpdateNomenclatureGroupNotFoundError = (
  id: IdType,
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getNotFoundErrorMockFn(updateNomenclatureGroupMockFn(id), options)()

export const mockUpdateNomenclatureGroupForbiddenError = (
  id: IdType,
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getForbiddenErrorMockFn(updateNomenclatureGroupMockFn(id), options)()

export const mockUpdateNomenclatureGroupServerError = (
  id: IdType,
  options?: Partial<ResponseResolverOptions>,
) => getServerErrorMockFn(updateNomenclatureGroupMockFn(id), options)()
