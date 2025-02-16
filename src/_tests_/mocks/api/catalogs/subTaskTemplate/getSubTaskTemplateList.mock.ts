import { CatalogApiPathsEnum } from 'shared/catalogs/api/constants/endpoints'
import { GetSubTaskTemplatesCatalogResponse } from 'shared/catalogs/subTaskTemplates/api/schemas'
import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getServerErrorMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getSubTaskTemplateListMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, CatalogApiPathsEnum.GetSubTaskTemplates)

export const mockGetSubTaskTemplateListSuccess = (
  options?: Partial<ResponseResolverOptions<GetSubTaskTemplatesCatalogResponse>>,
) => getSuccessMockFn(getSubTaskTemplateListMockFn(), options)()

export const mockGetSubTaskTemplateListServerError = (options?: Partial<ResponseResolverOptions>) =>
  getServerErrorMockFn(getSubTaskTemplateListMockFn(), options)()
