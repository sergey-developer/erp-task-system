import { GetSubTaskTemplateListSuccessResponse } from 'shared/catalogs/api/dto/subTaskTemplates'
import { CatalogsApiEnum } from 'shared/catalogs/constants'
import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getServerErrorMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getSubTaskTemplateListMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, CatalogsApiEnum.GetSubTaskTemplateList)

export const mockGetSubTaskTemplateListSuccess = (
  options?: Partial<ResponseResolverOptions<GetSubTaskTemplateListSuccessResponse>>,
) => getSuccessMockFn(getSubTaskTemplateListMockFn(), options)()

export const mockGetSubTaskTemplateListServerError = (options?: Partial<ResponseResolverOptions>) =>
  getServerErrorMockFn(getSubTaskTemplateListMockFn(), options)()
