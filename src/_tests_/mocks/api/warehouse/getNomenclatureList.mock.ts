import { NomenclatureApiEnum } from 'modules/warehouse/constants'
import { GetNomenclatureListTransformedSuccessResponse } from 'modules/warehouse/types'

import { HttpMethodEnum } from 'shared/constants/http'

import {
  getForbiddenErrorMockFn,
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
} from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getNomenclatureListMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, NomenclatureApiEnum.GetNomenclatureList)

export const mockGetNomenclatureListSuccess = (
  options?: Partial<ResponseResolverOptions<GetNomenclatureListTransformedSuccessResponse>>,
) => getSuccessMockFn(getNomenclatureListMockFn(), options)()

export const mockGetNomenclatureListForbiddenError = (options?: Partial<ResponseResolverOptions>) =>
  getForbiddenErrorMockFn(getNomenclatureListMockFn(), options)()

export const mockGetNomenclatureListServerError = (options?: Partial<ResponseResolverOptions>) =>
  getServerErrorMockFn(getNomenclatureListMockFn(), options)()
