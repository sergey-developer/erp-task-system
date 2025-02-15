import { NomenclaturesGroupsApiPathsEnum } from 'features/nomenclatures/api/constants'
import { GetNomenclaturesGroupsResponse } from 'features/nomenclatures/api/schemas'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getNomenclatureGroupListMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, NomenclaturesGroupsApiPathsEnum.GetNomenclaturesGroups)

export const mockGetNomenclatureGroupListSuccess = (
  options?: Partial<ResponseResolverOptions<GetNomenclaturesGroupsResponse>>,
) => getSuccessMockFn(getNomenclatureGroupListMockFn(), options)()
