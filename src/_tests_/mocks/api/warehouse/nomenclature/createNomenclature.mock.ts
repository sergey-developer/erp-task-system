import { NomenclatureApiEnum } from 'features/warehouse/constants/nomenclature'
import { CreateNomenclatureSuccessResponse } from 'features/warehouse/models'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const createNomenclatureMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Post, NomenclatureApiEnum.CreateNomenclature)

export const mockCreateNomenclatureSuccess = (
  options?: Partial<ResponseResolverOptions<CreateNomenclatureSuccessResponse>>,
) => getSuccessMockFn(createNomenclatureMockFn(), options)()
