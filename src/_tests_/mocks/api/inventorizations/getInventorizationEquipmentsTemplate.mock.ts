import { InventorizationsApiPathsEnum } from 'features/inventorizations/api/constants'
import { GetInventorizationEquipmentsTemplateResponse } from 'features/inventorizations/api/schemas'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getInventorizationEquipmentsTemplateMockFn = () =>
  getRequestMockFn(
    HttpMethodEnum.Get,
    InventorizationsApiPathsEnum.GetInventorizationEquipmentsTemplate,
  )

export const mockGetInventorizationEquipmentsTemplateSuccess = (
  options?: Partial<ResponseResolverOptions<GetInventorizationEquipmentsTemplateResponse>>,
) => getSuccessMockFn(getInventorizationEquipmentsTemplateMockFn(), options)()
