import { EquipmentsApiPathsEnum } from 'features/equipments/api/constants'
import { GetEquipmentListResponse } from 'features/warehouse/models'

import { ErrorData } from 'shared/api/baseApi'
import { HttpMethodEnum } from 'shared/constants/http'

import {
  getForbiddenErrorMockFn,
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
} from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getEquipmentListMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, EquipmentsApiPathsEnum.GetEquipments)

export const mockGetEquipmentListSuccess = (
  options?: Partial<ResponseResolverOptions<GetEquipmentListResponse>>,
) => getSuccessMockFn(getEquipmentListMockFn(), options)()

export const mockGetEquipmentListForbiddenError = (
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getForbiddenErrorMockFn(getEquipmentListMockFn(), options)()

export const mockGetEquipmentListServerError = (options?: Partial<ResponseResolverOptions>) =>
  getServerErrorMockFn(getEquipmentListMockFn(), options)()
