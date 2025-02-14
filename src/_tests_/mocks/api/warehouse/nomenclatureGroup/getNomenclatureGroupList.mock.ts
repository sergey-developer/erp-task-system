import { NomenclaturesGroupsEndpointsEnum } from 'features/warehouse/constants/nomenclatureGroup'
import { GetNomenclaturesGroupsResponse } from 'features/warehouse/models'

import { HttpMethodEnum } from 'shared/constants/http'

import {
  getForbiddenErrorMockFn,
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
} from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getNomenclatureGroupListMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, NomenclaturesGroupsEndpointsEnum.GetNomenclaturesGroups)

export const mockGetNomenclatureGroupListSuccess = (
  options?: Partial<ResponseResolverOptions<GetNomenclaturesGroupsResponse>>,
) => getSuccessMockFn(getNomenclatureGroupListMockFn(), options)()

export const mockGetNomenclatureGroupListForbiddenError = (
  options?: Partial<ResponseResolverOptions>,
) => getForbiddenErrorMockFn(getNomenclatureGroupListMockFn(), options)()

export const mockGetNomenclatureGroupListServerError = (
  options?: Partial<ResponseResolverOptions>,
) => getServerErrorMockFn(getNomenclatureGroupListMockFn(), options)()
