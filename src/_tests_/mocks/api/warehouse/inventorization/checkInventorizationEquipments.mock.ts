import { InventorizationsApiPathsEnum } from 'features/inventorizations/constants'
import {
  CheckInventorizationEquipmentsBadRequestErrorResponse,
  CheckInventorizationEquipmentsResponse,
} from 'features/warehouse/models'

import { HttpMethodEnum } from 'shared/constants/http'

import { getBadRequestErrorMockFn, getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const checkInventorizationEquipmentsMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Post, InventorizationsApiPathsEnum.CheckInventorizationEquipments)

export const mockCheckInventorizationEquipmentsSuccess = (
  options?: Partial<ResponseResolverOptions<CheckInventorizationEquipmentsResponse>>,
) => getSuccessMockFn(checkInventorizationEquipmentsMockFn(), options)()

export const mockCheckInventorizationEquipmentsBadRequestError = (
  options?: Partial<ResponseResolverOptions<CheckInventorizationEquipmentsBadRequestErrorResponse>>,
) => getBadRequestErrorMockFn(checkInventorizationEquipmentsMockFn(), options)()
