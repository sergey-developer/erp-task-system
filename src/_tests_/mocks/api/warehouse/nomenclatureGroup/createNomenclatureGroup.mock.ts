import {
  CreateNomenclatureGroupBadRequestErrorResponse,
  CreateNomenclatureGroupSuccessResponse,
} from 'features/warehouse/models'
import { NomenclatureGroupApiEnum } from 'features/warehouse/constants/nomenclatureGroup'

import { HttpMethodEnum } from 'shared/constants/http'
import { ErrorData } from 'shared/api/baseApi'

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
