import { NomenclaturesApiPathsEnum } from 'features/nomenclatures/api/constants'
import { GetNomenclaturesResponse } from 'features/nomenclatures/api/schemas'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/api/request'
import { ResponseResolverOptions } from '_tests_/mocks/api/response'

const getNomenclaturesMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, NomenclaturesApiPathsEnum.GetNomenclatures)

export const mockGetNomenclaturesSuccess = (
  options?: Partial<ResponseResolverOptions<GetNomenclaturesResponse>>,
) => getSuccessMockFn(getNomenclaturesMockFn(), options)()
