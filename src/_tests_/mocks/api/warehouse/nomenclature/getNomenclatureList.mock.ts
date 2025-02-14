import { NomenclaturesEndpointsEnum } from 'features/nomenclatures/api/constants'
import { GetNomenclatureListResponse } from 'features/warehouse/models'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getNomenclatureListMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, NomenclaturesEndpointsEnum.GetNomenclatures)

export const mockGetNomenclatureListSuccess = (
  options?: Partial<ResponseResolverOptions<GetNomenclatureListResponse>>,
) => getSuccessMockFn(getNomenclatureListMockFn(), options)()
