import { EquipmentsApiPathsEnum } from 'features/equipments/api/constants'
import { GetEquipmentsResponse } from 'features/equipments/api/schemas'

import { ErrorData } from 'shared/api/baseApi'
import { HttpMethodEnum } from 'shared/constants/http'

import {
  getForbiddenErrorMockFn,
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
} from '_tests_/mocks/api/request'
import { ResponseResolverOptions } from '_tests_/mocks/api/response'

const getEquipmentsMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, EquipmentsApiPathsEnum.GetEquipments)

export const mockGetEquipmentsSuccess = (
  options?: Partial<ResponseResolverOptions<GetEquipmentsResponse>>,
) => getSuccessMockFn(getEquipmentsMockFn(), options)()

export const mockGetEquipmentsForbiddenError = (
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getForbiddenErrorMockFn(getEquipmentsMockFn(), options)()

export const mockGetEquipmentsServerError = (options?: Partial<ResponseResolverOptions>) =>
  getServerErrorMockFn(getEquipmentsMockFn(), options)()
