import { NomenclaturesGroupsApiPathsEnum } from 'features/nomenclatures/api/constants'
import { GetNomenclaturesGroupsResponse } from 'features/nomenclatures/api/schemas'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/api/request'
import { ResponseResolverOptions } from '_tests_/mocks/api/response'

const getNomenclatureGroupsMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, NomenclaturesGroupsApiPathsEnum.GetNomenclaturesGroups)

export const mockGetNomenclatureGroupsSuccess = (
  options?: Partial<ResponseResolverOptions<GetNomenclaturesGroupsResponse>>,
) => getSuccessMockFn(getNomenclatureGroupsMockFn(), options)()
