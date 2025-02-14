import { NomenclatureApiEnum } from 'features/warehouse/constants/nomenclature'
import { GetNomenclatureListResponse } from 'features/warehouse/models'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getNomenclatureListMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, NomenclatureApiEnum.GetNomenclatureList)

export const mockGetNomenclatureListSuccess = (
  options?: Partial<ResponseResolverOptions<GetNomenclatureListResponse>>,
) => getSuccessMockFn(getNomenclatureListMockFn(), options)()
