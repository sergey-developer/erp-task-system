import { EquipmentApiEnum } from 'features/warehouse/constants/equipment'
import { GetEquipmentNomenclaturesSuccessResponse } from 'features/warehouse/models'

import { HttpMethodEnum } from 'shared/constants/http'
import { ErrorData } from 'shared/api/baseApi'

import {
  getForbiddenErrorMockFn,
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
} from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getEquipmentNomenclaturesMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, EquipmentApiEnum.GetEquipmentNomenclatures)

export const mockGetEquipmentNomenclaturesSuccess = (
  options?: Partial<ResponseResolverOptions<GetEquipmentNomenclaturesSuccessResponse>>,
) => getSuccessMockFn(getEquipmentNomenclaturesMockFn(), options)()

export const mockGetEquipmentNomenclaturesForbiddenError = (
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getForbiddenErrorMockFn(getEquipmentNomenclaturesMockFn(), options)()

export const mockGetEquipmentNomenclaturesServerError = (
  options?: Partial<ResponseResolverOptions>,
) => getServerErrorMockFn(getEquipmentNomenclaturesMockFn(), options)()
