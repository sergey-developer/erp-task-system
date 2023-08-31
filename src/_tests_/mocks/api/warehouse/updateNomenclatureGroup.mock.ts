import {
  UpdateNomenclatureGroupBadRequestErrorResponse,
  UpdateNomenclatureGroupSuccessResponse,
} from 'modules/warehouse/models'
import { updateNomenclatureGroupUrl } from 'modules/warehouse/utils'

import { HttpMethodEnum } from 'shared/constants/http'
import { ErrorData } from 'shared/services/api'

import {
  getBadRequestErrorMockFn,
  getForbiddenErrorMockFn,
  getNotFoundErrorMockFn,
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
} from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const updateNomenclatureGroupMockFn = (id: number) =>
  getRequestMockFn(HttpMethodEnum.Patch, updateNomenclatureGroupUrl(id))

export const mockUpdateNomenclatureGroupSuccess = (
  id: number,
  options?: Partial<
    ResponseResolverOptions<UpdateNomenclatureGroupSuccessResponse>
  >,
) => getSuccessMockFn(updateNomenclatureGroupMockFn(id), options)()

export const mockUpdateNomenclatureGroupBadRequestError = <
  T extends UpdateNomenclatureGroupBadRequestErrorResponse,
>(
  id: number,
  options?: Partial<ResponseResolverOptions<ErrorData<T>>>,
) => getBadRequestErrorMockFn(updateNomenclatureGroupMockFn(id), options)()

export const mockUpdateNomenclatureGroupNotFoundError = (
  id: number,
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getNotFoundErrorMockFn(updateNomenclatureGroupMockFn(id), options)()

export const mockUpdateNomenclatureGroupForbiddenError = (
  id: number,
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getForbiddenErrorMockFn(updateNomenclatureGroupMockFn(id), options)()

export const mockUpdateNomenclatureGroupServerError = (
  id: number,
  options?: Partial<ResponseResolverOptions>,
) => getServerErrorMockFn(updateNomenclatureGroupMockFn(id), options)()
