import { EquipmentsEndpointsEnum } from 'features/equipments/api/constants'
import {
  CreateEquipmentBadRequestErrorResponse,
  ImportEquipmentsByFileResponse,
} from 'features/warehouse/models'

import { ErrorData } from 'shared/api/baseApi'
import { HttpMethodEnum } from 'shared/constants/http'

import {
  getBadRequestErrorMockFn,
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
} from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const importEquipmentsByFileMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Post, EquipmentsEndpointsEnum.ImportEquipmentsByFile)

export const mockImportEquipmentsByFileSuccess = (
  options?: Partial<ResponseResolverOptions<ImportEquipmentsByFileResponse>>,
) => getSuccessMockFn(importEquipmentsByFileMockFn(), options)()

export const mockImportEquipmentsByFileBadRequestError = <
  T extends CreateEquipmentBadRequestErrorResponse,
>(
  options?: Partial<ResponseResolverOptions<ErrorData<T>>>,
) => getBadRequestErrorMockFn(importEquipmentsByFileMockFn(), options)()

export const mockImportEquipmentsByFileServerError = (options?: Partial<ResponseResolverOptions>) =>
  getServerErrorMockFn(importEquipmentsByFileMockFn(), options)()
