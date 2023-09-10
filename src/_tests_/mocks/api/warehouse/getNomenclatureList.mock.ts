import { NomenclatureApiEnum } from 'modules/warehouse/constants'
import { GetNomenclatureListTransformedSuccessResponse } from 'modules/warehouse/types'

import { HttpMethodEnum } from 'shared/constants/http'

import {
  getForbiddenErrorMockFn,
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
  ResponseResolverOptions,
} from '_tests_/mocks/api'

const getNomenclatureListMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, NomenclatureApiEnum.GetNomenclatureList)

export const mockGetNomenclatureListSuccess = (
  options?: Partial<
    ResponseResolverOptions<GetNomenclatureListTransformedSuccessResponse>
  >,
) => getSuccessMockFn(getNomenclatureListMockFn(), options)()

export const mockGetNomenclatureListForbiddenError = (
  options?: Partial<ResponseResolverOptions>,
) => getForbiddenErrorMockFn(getNomenclatureListMockFn(), options)()

export const mockGetNomenclatureListServerError = (
  options?: Partial<ResponseResolverOptions>,
) => getServerErrorMockFn(getNomenclatureListMockFn(), options)()
