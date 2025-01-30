import { EquipmentApiEnum } from 'features/warehouse/constants/equipment'
import { GetEquipmentListSuccessResponse } from 'features/warehouse/models'

import { HttpMethodEnum } from 'shared/constants/http'
import { ErrorData } from 'shared/api/services/baseApi'

import {
  getForbiddenErrorMockFn,
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
} from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getEquipmentListMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, EquipmentApiEnum.GetEquipmentList)

export const mockGetEquipmentListSuccess = (
  options?: Partial<ResponseResolverOptions<GetEquipmentListSuccessResponse>>,
) => getSuccessMockFn(getEquipmentListMockFn(), options)()

export const mockGetEquipmentListForbiddenError = (
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getForbiddenErrorMockFn(getEquipmentListMockFn(), options)()

export const mockGetEquipmentListServerError = (options?: Partial<ResponseResolverOptions>) =>
  getServerErrorMockFn(getEquipmentListMockFn(), options)()
