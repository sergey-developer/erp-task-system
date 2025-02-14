import { InventorizationsEndpointsEnum } from 'features/inventorizations/constants'
import { GetInventorizationEquipmentsTemplateResponse } from 'features/warehouse/models'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getInventorizationEquipmentsTemplateMockFn = () =>
  getRequestMockFn(
    HttpMethodEnum.Get,
    InventorizationsEndpointsEnum.GetInventorizationEquipmentsTemplate,
  )

export const mockGetInventorizationEquipmentsTemplateSuccess = (
  options?: Partial<ResponseResolverOptions<GetInventorizationEquipmentsTemplateResponse>>,
) => getSuccessMockFn(getInventorizationEquipmentsTemplateMockFn(), options)()
