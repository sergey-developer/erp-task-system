import { EquipmentsApiPathsEnum } from 'features/equipments/api/constants'
import { GetEquipmentNomenclaturesResponse } from 'features/equipments/api/schemas'

import { ErrorData } from 'shared/api/baseApi'
import { HttpMethodEnum } from 'shared/constants/http'

import {
  getForbiddenErrorMockFn,
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
} from '_tests_/mocks/api/request'
import { ResponseResolverOptions } from '_tests_/mocks/api/response'

const getEquipmentNomenclaturesMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, EquipmentsApiPathsEnum.GetEquipmentNomenclatures)

export const mockGetEquipmentNomenclaturesSuccess = (
  options?: Partial<ResponseResolverOptions<GetEquipmentNomenclaturesResponse>>,
) => getSuccessMockFn(getEquipmentNomenclaturesMockFn(), options)()

export const mockGetEquipmentNomenclaturesForbiddenError = (
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getForbiddenErrorMockFn(getEquipmentNomenclaturesMockFn(), options)()

export const mockGetEquipmentNomenclaturesServerError = (
  options?: Partial<ResponseResolverOptions>,
) => getServerErrorMockFn(getEquipmentNomenclaturesMockFn(), options)()
