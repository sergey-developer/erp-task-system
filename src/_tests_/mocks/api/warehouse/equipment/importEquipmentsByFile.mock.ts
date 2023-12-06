import { EquipmentApiEnum } from 'modules/warehouse/constants/equipment'
import {
  CreateEquipmentBadRequestErrorResponse,
  ImportEquipmentsByFileSuccessResponse,
} from 'modules/warehouse/models'

import { HttpMethodEnum } from 'shared/constants/http'
import { ErrorData } from 'shared/services/baseApi'

import {
  getBadRequestErrorMockFn,
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
} from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const importEquipmentsByFileMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Post, EquipmentApiEnum.ImportEquipmentsByFile)

export const mockImportEquipmentsByFileSuccess = (
  options?: Partial<ResponseResolverOptions<ImportEquipmentsByFileSuccessResponse>>,
) => getSuccessMockFn(importEquipmentsByFileMockFn(), options)()

export const mockImportEquipmentsByFileBadRequestError = <
  T extends CreateEquipmentBadRequestErrorResponse,
>(
  options?: Partial<ResponseResolverOptions<ErrorData<T>>>,
) => getBadRequestErrorMockFn(importEquipmentsByFileMockFn(), options)()

export const mockImportEquipmentsByFileServerError = (options?: Partial<ResponseResolverOptions>) =>
  getServerErrorMockFn(importEquipmentsByFileMockFn(), options)()
