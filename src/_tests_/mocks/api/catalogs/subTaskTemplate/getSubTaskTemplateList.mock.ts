import { CatalogEndpointsEnum } from 'shared/catalogs/api/constants/endpoints'
import { GetSubTaskTemplatesCatalogSuccessResponse } from 'shared/catalogs/subTaskTemplates/api/schemas/getSubTaskTemplatesCatalog.schema'
import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getServerErrorMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getSubTaskTemplateListMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, CatalogEndpointsEnum.GetSubTaskTemplateList)

export const mockGetSubTaskTemplateListSuccess = (
  options?: Partial<ResponseResolverOptions<GetSubTaskTemplatesCatalogSuccessResponse>>,
) => getSuccessMockFn(getSubTaskTemplateListMockFn(), options)()

export const mockGetSubTaskTemplateListServerError = (options?: Partial<ResponseResolverOptions>) =>
  getServerErrorMockFn(getSubTaskTemplateListMockFn(), options)()
