import { EquipmentApiEnum } from 'modules/warehouse/constants'
import { GetEquipmentCategoryListSuccessResponse } from 'modules/warehouse/models'

import { HttpMethodEnum } from 'shared/constants/http'

import {
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
  ResponseResolverOptions
} from '_tests_/mocks/api'

const getEquipmentCategoryListMockFn = () =>
  getRequestMockFn(
    HttpMethodEnum.Get,
    EquipmentApiEnum.GetEquipmentCategoryList,
  )

export const mockGetEquipmentCategoryListSuccess = (
  options?: Partial<
    ResponseResolverOptions<GetEquipmentCategoryListSuccessResponse>
  >,
) => getSuccessMockFn(getEquipmentCategoryListMockFn(), options)()

export const mockGetEquipmentCategoryListServerError = (
  options?: Partial<ResponseResolverOptions>,
) => getServerErrorMockFn(getEquipmentCategoryListMockFn(), options)()
