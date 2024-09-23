import { InventorizationApiEnum } from 'modules/warehouse/constants/inventorization'
import { CheckInventorizationEquipmentsTemplateSuccessResponse } from 'modules/warehouse/models'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const checkInventorizationEquipmentsTemplateMockFn = () =>
  getRequestMockFn(
    HttpMethodEnum.Post,
    InventorizationApiEnum.CheckInventorizationEquipmentsTemplate,
  )

export const mockCheckInventorizationEquipmentsTemplateSuccess = (
  options?: Partial<ResponseResolverOptions<CheckInventorizationEquipmentsTemplateSuccessResponse>>,
) => getSuccessMockFn(checkInventorizationEquipmentsTemplateMockFn(), options)()
