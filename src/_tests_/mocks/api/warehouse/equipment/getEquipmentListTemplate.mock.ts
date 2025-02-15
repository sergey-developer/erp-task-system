import { EquipmentsApiPathsEnum } from 'features/equipments/api/constants'
import { GetEquipmentsTemplateResponse } from 'features/equipments/api/schemas'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getServerErrorMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getEquipmentListTemplateMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, EquipmentsApiPathsEnum.GetEquipmentsTemplate)

export const mockGetEquipmentListTemplateSuccess = (
  options?: Partial<ResponseResolverOptions<GetEquipmentsTemplateResponse>>,
) => getSuccessMockFn(getEquipmentListTemplateMockFn(), options)()

export const mockGetEquipmentListTemplateServerError = (
  options?: Partial<ResponseResolverOptions>,
) => getServerErrorMockFn(getEquipmentListTemplateMockFn(), options)()
