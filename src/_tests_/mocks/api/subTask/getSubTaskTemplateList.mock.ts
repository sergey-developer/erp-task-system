import { GetSubTaskTemplateListSuccessResponse } from 'modules/subTask/models'
import { getSubTaskTemplateListUrl } from 'modules/subTask/utils'

import { HttpMethodEnum } from 'shared/constants/http'

import {
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
} from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getSubTaskTemplateListMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, getSubTaskTemplateListUrl())

export const mockGetSubTaskTemplateListSuccess = (
  options?: Partial<
    ResponseResolverOptions<GetSubTaskTemplateListSuccessResponse>
  >,
) => getSuccessMockFn(getSubTaskTemplateListMockFn(), options)()

export const mockGetSubTaskTemplateListServerError = (
  options?: Partial<ResponseResolverOptions>,
) => getServerErrorMockFn(getSubTaskTemplateListMockFn(), options)()
