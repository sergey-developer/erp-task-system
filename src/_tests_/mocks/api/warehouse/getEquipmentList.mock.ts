import { EquipmentApiEnum } from 'modules/warehouse/constants'
import { GetEquipmentListTransformedSuccessResponse } from 'modules/warehouse/types'

import { HttpMethodEnum } from 'shared/constants/http'
import { ErrorData } from 'shared/services/baseApi'

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
  options?: Partial<ResponseResolverOptions<GetEquipmentListTransformedSuccessResponse>>,
) => getSuccessMockFn(getEquipmentListMockFn(), options)()

export const mockGetEquipmentListForbiddenError = (
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getForbiddenErrorMockFn(getEquipmentListMockFn(), options)()

export const mockGetEquipmentListServerError = (options?: Partial<ResponseResolverOptions>) =>
  getServerErrorMockFn(getEquipmentListMockFn(), options)()
