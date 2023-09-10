import { NomenclatureApiEnum } from 'modules/warehouse/constants'
import {
  CreateNomenclatureBadRequestErrorResponse,
  CreateNomenclatureSuccessResponse,
} from 'modules/warehouse/models'

import { HttpMethodEnum } from 'shared/constants/http'
import { ErrorData } from 'shared/services/baseApi'

import {
  getBadRequestErrorMockFn,
  getForbiddenErrorMockFn,
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
  ResponseResolverOptions
} from '_tests_/mocks/api'

const createNomenclatureMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Post, NomenclatureApiEnum.CreateNomenclature)

export const mockCreateNomenclatureSuccess = (
  options?: Partial<ResponseResolverOptions<CreateNomenclatureSuccessResponse>>,
) => getSuccessMockFn(createNomenclatureMockFn(), options)()

export const mockCreateNomenclatureBadRequestError = <
  T extends CreateNomenclatureBadRequestErrorResponse,
>(
  options?: Partial<ResponseResolverOptions<ErrorData<T>>>,
) => getBadRequestErrorMockFn(createNomenclatureMockFn(), options)()

export const mockCreateNomenclatureForbiddenError = (
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getForbiddenErrorMockFn(createNomenclatureMockFn(), options)()

export const mockCreateNomenclatureServerError = (
  options?: Partial<ResponseResolverOptions>,
) => getServerErrorMockFn(createNomenclatureMockFn(), options)()
