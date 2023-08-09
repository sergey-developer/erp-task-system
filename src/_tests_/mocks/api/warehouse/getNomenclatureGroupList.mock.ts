import { NomenclatureApiEnum } from 'modules/warehouse/constants'
import { GetWarehouseListSuccessResponse } from 'modules/warehouse/models'

import { HttpMethodEnum } from 'shared/constants/http'

import {
  getForbiddenErrorMockFn,
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
} from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getNomenclatureGroupListMockFn = () =>
  getRequestMockFn(
    HttpMethodEnum.Get,
    NomenclatureApiEnum.GetNomenclatureGroupList,
  )

export const mockGetNomenclatureGroupListSuccess = (
  options?: Partial<ResponseResolverOptions<GetWarehouseListSuccessResponse>>,
) => getSuccessMockFn(getNomenclatureGroupListMockFn(), options)()

export const mockGetNomenclatureGroupListForbiddenError = (
  options?: Partial<ResponseResolverOptions>,
) => getForbiddenErrorMockFn(getNomenclatureGroupListMockFn(), options)()

export const mockGetNomenclatureGroupListServerError = (
  options?: Partial<ResponseResolverOptions>,
) => getServerErrorMockFn(getNomenclatureGroupListMockFn(), options)()
