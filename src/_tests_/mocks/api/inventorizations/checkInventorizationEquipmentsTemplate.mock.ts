import { InventorizationsApiPathsEnum } from 'features/inventorizations/api/constants'
import {
  CheckInventorizationEquipmentsTemplateBadRequestResponse,
  CheckInventorizationEquipmentsTemplateResponse,
} from 'features/inventorizations/api/schemas'

import { HttpMethodEnum } from 'shared/constants/http'

import { getBadRequestErrorMockFn, getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/api/request'
import { ResponseResolverOptions } from '_tests_/mocks/api/response'

const checkInventorizationEquipmentsTemplateMockFn = () =>
  getRequestMockFn(
    HttpMethodEnum.Post,
    InventorizationsApiPathsEnum.CheckInventorizationEquipmentsTemplate,
  )

export const mockCheckInventorizationEquipmentsTemplateSuccess = (
  options?: Partial<ResponseResolverOptions<CheckInventorizationEquipmentsTemplateResponse>>,
) => getSuccessMockFn(checkInventorizationEquipmentsTemplateMockFn(), options)()

export const mockCheckInventorizationEquipmentsTemplateBadRequestError = (
  options?: Partial<
    ResponseResolverOptions<CheckInventorizationEquipmentsTemplateBadRequestResponse>
  >,
) => getBadRequestErrorMockFn(checkInventorizationEquipmentsTemplateMockFn(), options)()
