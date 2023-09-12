import {
  CreateNomenclatureGroupBadRequestErrorResponse,
  CreateNomenclatureGroupSuccessResponse,
} from 'modules/warehouse/models'
import { NomenclatureGroupApiEnum } from 'modules/warehouse/services/nomenclatureGroupApiService'

import { HttpMethodEnum } from 'shared/constants/http'
import { ErrorData } from 'shared/services/baseApi'

import {
  getBadRequestErrorMockFn,
  getForbiddenErrorMockFn,
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
} from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const createNomenclatureGroupMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Post, NomenclatureGroupApiEnum.CreateNomenclatureGroup)

export const mockCreateNomenclatureGroupSuccess = (
  options?: Partial<ResponseResolverOptions<CreateNomenclatureGroupSuccessResponse>>,
) => getSuccessMockFn(createNomenclatureGroupMockFn(), options)()

export const mockCreateNomenclatureGroupBadRequestError = <
  T extends CreateNomenclatureGroupBadRequestErrorResponse,
>(
  options?: Partial<ResponseResolverOptions<ErrorData<T>>>,
) => getBadRequestErrorMockFn(createNomenclatureGroupMockFn(), options)()

export const mockCreateNomenclatureGroupForbiddenError = (
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getForbiddenErrorMockFn(createNomenclatureGroupMockFn(), options)()

export const mockCreateNomenclatureGroupServerError = (
  options?: Partial<ResponseResolverOptions>,
) => getServerErrorMockFn(createNomenclatureGroupMockFn(), options)()
