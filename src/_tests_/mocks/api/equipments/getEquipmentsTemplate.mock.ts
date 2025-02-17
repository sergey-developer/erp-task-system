import { EquipmentsApiPathsEnum } from 'features/equipments/api/constants'
import { GetEquipmentsTemplateResponse } from 'features/equipments/api/schemas'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getServerErrorMockFn, getSuccessMockFn } from '_tests_/mocks/api/request'
import { ResponseResolverOptions } from '_tests_/mocks/api/response'

const getEquipmentsTemplateMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, EquipmentsApiPathsEnum.GetEquipmentsTemplate)

export const mockGetEquipmentsTemplateSuccess = (
  options?: Partial<ResponseResolverOptions<GetEquipmentsTemplateResponse>>,
) => getSuccessMockFn(getEquipmentsTemplateMockFn(), options)()

export const mockGetEquipmentsTemplateServerError = (options?: Partial<ResponseResolverOptions>) =>
  getServerErrorMockFn(getEquipmentsTemplateMockFn(), options)()
