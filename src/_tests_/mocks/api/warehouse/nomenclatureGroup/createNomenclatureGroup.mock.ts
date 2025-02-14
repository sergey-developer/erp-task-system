import { NomenclaturesGroupsEndpointsEnum } from 'features/nomenclatures/api/constants'
import {
  CreateNomenclatureGroupBadRequestResponse,
  CreateNomenclatureGroupResponse,
} from 'features/warehouse/models'

import { ErrorData } from 'shared/api/baseApi'
import { HttpMethodEnum } from 'shared/constants/http'

import {
  getBadRequestErrorMockFn,
  getForbiddenErrorMockFn,
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
} from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const createNomenclatureGroupMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Post, NomenclaturesGroupsEndpointsEnum.CreateNomenclatureGroup)

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
