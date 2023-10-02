import { GetNomenclatureGroupListSuccessResponse } from 'modules/warehouse/models'
import { NomenclatureGroupApiEnum } from 'modules/warehouse/constants/nomenclatureGroup'

import { HttpMethodEnum } from 'shared/constants/http'

import {
  getForbiddenErrorMockFn,
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
} from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getNomenclatureGroupListMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, NomenclatureGroupApiEnum.GetNomenclatureGroupList)

export const mockGetNomenclatureGroupListSuccess = (
  options?: Partial<ResponseResolverOptions<GetNomenclatureGroupListSuccessResponse>>,
) => getSuccessMockFn(getNomenclatureGroupListMockFn(), options)()

export const mockGetNomenclatureGroupListForbiddenError = (
  options?: Partial<ResponseResolverOptions>,
) => getForbiddenErrorMockFn(getNomenclatureGroupListMockFn(), options)()

export const mockGetNomenclatureGroupListServerError = (
  options?: Partial<ResponseResolverOptions>,
) => getServerErrorMockFn(getNomenclatureGroupListMockFn(), options)()
