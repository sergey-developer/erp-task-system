import { CatalogApiPathsEnum } from 'shared/catalogs/api/constants/endpoints'
import { GetSubTaskTemplatesCatalogResponse } from 'shared/catalogs/subTaskTemplates/api/schemas'
import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getServerErrorMockFn, getSuccessMockFn } from '_tests_/mocks/api/request'
import { ResponseResolverOptions } from '_tests_/mocks/api/response'

const getSubTaskTemplatesMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, CatalogApiPathsEnum.GetSubTaskTemplates)

export const mockGetSubTaskTemplatesSuccess = (
  options?: Partial<ResponseResolverOptions<GetSubTaskTemplatesCatalogResponse>>,
) => getSuccessMockFn(getSubTaskTemplatesMockFn(), options)()

export const mockGetSubTaskTemplatesServerError = (options?: Partial<ResponseResolverOptions>) =>
  getServerErrorMockFn(getSubTaskTemplatesMockFn(), options)()
