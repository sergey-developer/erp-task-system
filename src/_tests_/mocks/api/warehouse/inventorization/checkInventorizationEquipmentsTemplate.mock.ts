import { InventorizationApiEnum } from 'features/warehouse/constants/inventorization'
import {
  CheckInventorizationEquipmentsTemplateBadRequestErrorResponse,
  CheckInventorizationEquipmentsTemplateResponse,
} from 'features/warehouse/models'

import { HttpMethodEnum } from 'shared/constants/http'

import { getBadRequestErrorMockFn, getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const checkInventorizationEquipmentsTemplateMockFn = () =>
  getRequestMockFn(
    HttpMethodEnum.Post,
    InventorizationApiEnum.CheckInventorizationEquipmentsTemplate,
  )

export const mockCheckInventorizationEquipmentsTemplateSuccess = (
  options?: Partial<ResponseResolverOptions<CheckInventorizationEquipmentsTemplateResponse>>,
) => getSuccessMockFn(checkInventorizationEquipmentsTemplateMockFn(), options)()

export const mockCheckInventorizationEquipmentsTemplateBadRequestError = (
  options?: Partial<
    ResponseResolverOptions<CheckInventorizationEquipmentsTemplateBadRequestErrorResponse>
  >,
) => getBadRequestErrorMockFn(checkInventorizationEquipmentsTemplateMockFn(), options)()
