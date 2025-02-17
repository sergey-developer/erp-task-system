import { NomenclaturesGroupsApiPathsEnum } from 'features/nomenclatures/api/constants'
import {
  CreateNomenclatureGroupBadRequestResponse,
  CreateNomenclatureGroupResponse,
} from 'features/nomenclatures/api/schemas'

import { ErrorData } from 'shared/api/baseApi'
import { HttpMethodEnum } from 'shared/constants/http'

import {
  getBadRequestErrorMockFn,
  getForbiddenErrorMockFn,
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
} from '_tests_/mocks/api/request'
import { ResponseResolverOptions } from '_tests_/mocks/api/response'

const createNomenclatureGroupMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Post, NomenclaturesGroupsApiPathsEnum.CreateNomenclatureGroup)

export const mockCreateNomenclatureGroupSuccess = (
  options?: Partial<ResponseResolverOptions<CreateNomenclatureGroupResponse>>,
) => getSuccessMockFn(createNomenclatureGroupMockFn(), options)()

export const mockCreateNomenclatureGroupBadRequestError = <
  T extends CreateNomenclatureGroupBadRequestResponse,
>(
  options?: Partial<ResponseResolverOptions<ErrorData<T>>>,
) => getBadRequestErrorMockFn(createNomenclatureGroupMockFn(), options)()

export const mockCreateNomenclatureGroupForbiddenError = (
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getForbiddenErrorMockFn(createNomenclatureGroupMockFn(), options)()

export const mockCreateNomenclatureGroupServerError = (
  options?: Partial<ResponseResolverOptions>,
) => getServerErrorMockFn(createNomenclatureGroupMockFn(), options)()
