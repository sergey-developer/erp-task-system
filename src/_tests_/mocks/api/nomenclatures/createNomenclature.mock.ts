import { NomenclaturesApiPathsEnum } from 'features/nomenclatures/api/constants'
import { CreateNomenclatureResponse } from 'features/nomenclatures/api/schemas'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/api/request'
import { ResponseResolverOptions } from '_tests_/mocks/api/response'

const createNomenclatureMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Post, NomenclaturesApiPathsEnum.CreateNomenclature)

export const mockCreateNomenclatureSuccess = (
  options?: Partial<ResponseResolverOptions<CreateNomenclatureResponse>>,
) => getSuccessMockFn(createNomenclatureMockFn(), options)()
