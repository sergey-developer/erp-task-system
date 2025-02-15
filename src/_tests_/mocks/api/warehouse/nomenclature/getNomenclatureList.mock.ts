import { NomenclaturesApiPathsEnum } from 'features/nomenclatures/api/constants'
import { GetNomenclaturesResponse } from 'features/nomenclatures/api/schemas'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getNomenclatureListMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, NomenclaturesApiPathsEnum.GetNomenclatures)

export const mockGetNomenclatureListSuccess = (
  options?: Partial<ResponseResolverOptions<GetNomenclaturesResponse>>,
) => getSuccessMockFn(getNomenclatureListMockFn(), options)()
